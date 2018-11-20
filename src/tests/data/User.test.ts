import {User, Year} from "../../data/User";


test("Test if a user can graduate without taking classes", () => {
   let temp = new User(0, Year.Freshman, []);
   expect(temp.checkCanGraduate()).toBeFalsy();
});