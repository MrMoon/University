import {FindComponent} from "../find/FindComponent";

export const StdTableComponent = ({year, name, major, link}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Year</th>
                    <th>Name</th>
                    <th>Major</th>
                    <th>More Details</th>
                </tr>
                <tr>
                    <td>{year}</td>
                    <td>{name}</td>
                    <td>{major}</td>
                    <td>
                        <FindComponent link={link}/>
                    </td>
                </tr>
            </table>
        </div>
    );
};
