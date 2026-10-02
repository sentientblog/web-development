let notes = [
    { id: 1, text: "Buy milk and bread", category: "personal" },
    { id: 2, text: "Finish the Day 3 assignment", category: "study" },
    { id: 3, text: "Email the project report to Grace", category: "work" },
    { id: 4, text: "Revise JavaScript arrays", category: "study" },
    { id: 5, text: "Call mum", category: "personal" },
];

function searchNotes(word) {
    return notes.filter(note =>
        note.text.toLowerCase().includes(word.toLowerCase())
    );
}

function longestNote() {
    if (notes.length === 0) {
        return null;
    }

    let longest = notes[0];

    for (let note of notes) {
        if (note.text.length > longest.text.length) {
            longest = note;
        }
    }

    return longest;
}

function countByCategory() {
    let counts = {};

    for (let note of notes) {
        if (counts[note.category]) {
            counts[note.category]++;
        } else {
            counts[note.category] = 1;
        }
    }

    return counts;
}

function getSummary() {
    let counts = countByCategory();
    let noteWord = notes.length === 1 ? "note" : "notes";

    return `${notes.length} ${noteWord}: ${counts.personal || 0} personal, ${counts.work || 0} work, ${counts.study || 0} study.`;
}

function isDuplicate(text) {
    let cleanedText = text.trim().toLowerCase();

    return notes.some(note =>
        note.text.trim().toLowerCase() === cleanedText
    );
}

function addNote(text, category) {
    if (text.length < 1 || text.length > 200) {
        console.log("Note must be between 1 and 200 characters.");
        return false;
    }

    if (isDuplicate(text)) {
        console.log("Note is a duplicate.");
        return false;
    }

    if (!["personal", "work", "study"].includes(category)) {
        console.log("Invalid category.");
        return false;
    }

    notes.push({
        id: notes.length + 1,
        text: text,
        category: category
    });

    return true;
}


// Tests

console.log(searchNotes("javascript")); // Expected: [note 4]
console.log(searchNotes("pizza")); // Expected: []

console.log(longestNote()); // Expected: note 3
let savedNotes = notes;
notes = [];
console.log(longestNote()); // Expected: null
notes = savedNotes;

console.log(countByCategory()); // Expected: { personal: 2, study: 2, work: 1 }
console.log(countByCategory().work); // Expected: 1

console.log(getSummary()); // Expected: "5 notes: 2 personal, 1 work, 2 study."
notes = [notes[0]];
console.log(getSummary()); // Expected: "1 note: 1 personal, 0 work, 0 study."

notes = savedNotes;

console.log(isDuplicate("Call mum")); // Expected: true
console.log(isDuplicate("   call   mum   ")); // Expected: false

console.log(addNote("Finish JavaScript practice", "study")); // Expected: true
console.log(addNote("Call mum", "personal")); // Expected: false