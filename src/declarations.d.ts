declare module "*";

declare class Homewatch {
  auth: string;
  axios: any;
  homes: Homewatch.Homes;
  users: Homewatch.Users;
  constructor(url: string, auth?: string);
  scenarioThings(scenario: { id: number }): void;
  scenarios(home: { id: number }): Homewatch.Scenarios;
  status(thing: { id: number }): Homewatch.ThingStatus;
  things(home: { id: number }): Homewatch.Things;
}

declare namespace Homewatch {
  class Homes {
    private constructor();
    createHome(home: { name: string, tunnel: string, location: string }): Promise<any>;
    deleteHome(id: number): Promise<any>;
    getHome(id: number): Promise<any>;
    listHomes(): Promise<any>;
    updateHome(id: number, home: { name: string, tunnel: string, location: string }): Promise<any>;
  }

  class Users {
    private constructor();
    login(auth: { email: string, password: string }): Promise<any>;
    register(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
    currentUser(): Promise<any>;
    updateCurrentUser(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
  }

  class Things {
    private constructor();
    listThings(): Promise<any>;
    createThing(home: any): Promise<any>;
    updateThing(id: number, home: any): Promise<any>;
    deleteThing(id: number): Promise<any>;
    getThing(id: number): Promise<any>;
  }

  class ThingStatus {
    private constructor();
    getStatus(): Promise<any>;
    putStatus(status: Object): Promise<any>;
  }

  class Scenarios {
    private constructor();
    createScenario(scenario: { name: string }): Promise<any>;
    deleteScenario(id: number): Promise<any>;
    getScenario(id: number): Promise<any>;
    listScenario(): Promise<any>;
    updateScenario(id: number, scenario: { name: string }): Promise<any>;
  }
}
