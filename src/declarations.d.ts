/*
  Declaration files are how the Typescript compiler knows about the type information(or shape) of an object.
  They're what make intellisense work and make Typescript know all about your code.

  A wildcard module is declared below to allow third party libraries to be used in an app even if they don't
  provide their own type declarations.

  To learn more about using third party libraries in an Ionic app, check out the docs here:
  http://ionicframework.com/docs/v2/resources/third-party-libs/

  For more info on type definition files, check out the Typescript docs here:
  https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
*/
declare module "*";

declare class Homewatch {
  auth: string;
  homes: Homes;
  users: Users;
  constructor(url: string, auth?: string);
  scenarioThings(scenario: Object): void;
  scenarios(home: Object): void;
  status(thing: Object): void;
  things(home: Object): Things;
}

declare class Homes {
  createHome(...args: any[]): any;
  deleteHome(...args: any[]): any;
  getHome(...args: any[]): any;
  listHomes(...args: any[]): any;
  updateHome(...args: any[]): any;
}

declare class Users {
  login(auth: Object): any;
  register(user: Object): any;
  currentUser(): any;
  updateCurrentUser(user: Object): any;
}

declare class Things {
  listThings(): any;
  createThing(home: any): any;
  updateThing(id: number, home: any): any;
}
