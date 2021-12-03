import {HeaderComponent} from "./component/header/HeaderComponent";
import {OurStudentsComponent} from "./component/our_students/OurStudentsComponent";
import {AllStudentComponent} from "./component/all_student/AllStudentComponent";

function MainComponent() {
    return (
        <div className="App">
            <HeaderComponent/>
            <OurStudentsComponent/>
            <AllStudentComponent/>
        </div>
    );
}

export default MainComponent;
