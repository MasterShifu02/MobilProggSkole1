type Grade = "A" | "B" | "C" | "D" | "E" | "F"; // Mulige karakterer en student kan få

interface Student { // Struktur for en student
  id: number; // Unik identifikator for studenten
  name: string; // Navn på studenten
}

interface Subject { // Struktur for et fag
  id: number; // Unik identifikator for faget
  name: string; // Navn på faget
  students: number[]; // id-er til studenter som tar faget
  grades: Grade[]; // karakterer gitt i faget
}


const students: Student[] = [ // Array med alle studenter
  { id: 1, name: "Alice" }, // Student med id 1 og navn Alice
  { id: 2, name: "Bob" },   // Student med id 2 og navn Bob
  { id: 3, name: "Charlie" }, // Student med id 3 og navn Charlie
];

const subjects: Subject[] = [ // Array med alle fag
  {
    id: 1, // Fagets id
    name: "Mathematics", // Navn på faget
    students: [1, 2], // Studenter med id 1 og 2 (Alice og Bob)
    grades: ["A", "B", "F", "A", "A", "A", "A"], // Karakterer gitt i faget
  },
  {
    id: 2,
    name: "English",
    students: [2], // Kun Bob
    grades: ["A"],
  },
  {
    id: 3,
    name: "History",
    students: [1, 3], // Alice og Charlie
    grades: [], // Ingen karakterer enda
  },
];


const addStudent = (student: Student) => { // Funksjon for å legge til en student
  students.push(student); // Legger studenten til i students-arrayen
};

const addSubject = ( // Funksjon for å legge til et nytt fag
  subject: Pick<Subject, "name">, // Navn på faget
  students: number[], // id-er til studenter som tar faget
  grades: Grade[] = [] // karakterer (valgfritt)
) => {
  const subjectData: Subject = {
    id: subjects.length + 1, // Setter id til neste ledige tall
    name: subject.name || `Subject ${subjects.length + 1}`, // Bruker navn eller genererer et
    students, // id-er til studenter
    grades, // karakterer
  };
  subjects.push(subjectData); // Legger til faget i subjects-arrayen
};

const getGradeDistribution = (subjects: Subject[]) => { // Funksjon for å telle karakterfordeling
  const gradeNumbers = { // Objekt for å telle antall av hver karakter
    A: 0, // Antall A
    B: 0, // Antall B
    C: 0, // Antall C
    D: 0, // Antall D
    E: 0, // Antall E
    F: 0, // Antall F
  };

  for (const subject of subjects) { // Gå gjennom alle fag
    for (const grade of subject.grades) { // Gå gjennom alle karakterer i faget
      gradeNumbers[grade]++; // Øk telleren for riktig karakter
    }
  }

  return ( // Returnerer en tekst med fordelingen
    `Grade Distribution:` +
    Object.entries(gradeNumbers)
      .map(([grade, count]) => `  ${grade}: ${count}`) // Lager tekst for hver karakter
      .join("")
  );
};

addStudent({ id: 6, name: "Eve" }); // Legger til student med id 6 og navn Eve
addSubject({ name: "Biology" }, [1, 2, 3, 4, 5, 6]); // Legger til faget Biologi med alle studenter

console.log(getGradeDistribution(subjects)); // Skriver ut karakterfordelingen for alle fag