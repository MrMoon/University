import {StdTableComponent} from "../std_table/StdTableComponent";

export const AllStudentComponent = () => {

    const getRandomNumberBetween = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

    const names = ["Ali", "Mohammad", "Lara", "Yousef", "Amal", "Ahmad"];
    const years = [2021, 2020, 2019, 2018];
    const majors = ["Computer Science", "Data Science", "E-Marketing", "BIT"];
    const links = (name, major, year) => `https://www.google.com/search?q=${name}+${year}+${major}`;

    const students = [];
    for (let i = 0 ; i < getRandomNumberBetween(3, 10); ++i) {
        const name = names[getRandomNumberBetween(0, names.length - 1)];
        const year = years[getRandomNumberBetween(0, years.length - 1)];
        const major = majors[getRandomNumberBetween(0, majors.length - 1)];
        const link = links(name, major, year);
        students.push({
            "name": name,
            "year": year,
            "major": major,
            "link": link
        });
    }

    return (
        <div>
            <h1>First Year</h1>
            {students.slice(0, getRandomNumberBetween(2, students.length - 1)).map(({name, year, major, link}) =>
                <StdTableComponent name={name} year={year} major={major} link={link}/> )}
            <h1>Second Year</h1>
            {students.slice(0, getRandomNumberBetween(2, students.length - 1)).map(({name, year, major, link}) =>
                <StdTableComponent name={name} year={year} major={major} link={link}/> )}
            <h1>Third Year</h1>
            {students.slice(0, getRandomNumberBetween(2, students.length - 1)).map(({name, year, major, link}) =>
                <StdTableComponent name={name} year={year} major={major} link={link}/> )}
            <h1>Forth Year</h1>
            {students.slice(0, getRandomNumberBetween(2, students.length - 1)).map(({name, year, major, link}) =>
                <StdTableComponent name={name} year={year} major={major} link={link}/> )}
        </div>
    )
}
