import {SelectComponent} from "../select/SelectComponent";

export const OurStudentsComponent = () => {
    return (
        <div>
            <h1>Our Students</h1>
            <div>
                show only new students <input type="checkbox" />
            </div>
            <SelectComponent/>
        </div>
    );
}
