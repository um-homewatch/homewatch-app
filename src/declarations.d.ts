declare module "*";

declare class Homewatch {
  auth: string;
  axios: any;
  homes: Homewatch.Homes;
  users: Homewatch.Users;
  hub: Homewatch.Hub;
  constructor(url: string, cache?: boolean);
  scenarioThings(scenario: { id: number }): void;
  scenarios(home: { id: number }): Homewatch.Scenarios;
  status(thing: { id: number }): Homewatch.ThingStatus;
  things(home: { id: number }): Homewatch.Things;
}

declare namespace Homewatch {
  class Homes {
    createHome(home: { name: string, tunnel: string, location: string }): Promise<any>;
    deleteHome(id: number): Promise<any>;
    getHome(id: number): Promise<any>;
    listHomes(): Promise<any>;
    updateHome(id: number, home: { name: string, tunnel: string, location: string }): Promise<any>;
    private constructor();
  }

  class Users {
    login(auth: { email: string, password: string }): Promise<any>;
    register(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
    currentUser(): Promise<any>;
    updateCurrentUser(user: { name: string, email: string, password: string, password_confirmation: string }): Promise<any>;
    private constructor();
  }

  class Things {
    listThings(): Promise<any>;
    createThing(home: any): Promise<any>;
    updateThing(id: number, home: any): Promise<any>;
    deleteThing(id: number): Promise<any>;
    getThing(id: number): Promise<any>;
    private constructor();
  }

  class ThingStatus {
    getStatus(): Promise<any>;
    putStatus(status: Object): Promise<any>;
    private constructor();
  }

  class Scenarios {
    createScenario(scenario: { name: string }): Promise<any>;
    deleteScenario(id: number): Promise<any>;
    getScenario(id: number): Promise<any>;
    listScenarios(): Promise<any>;
    updateScenario(id: number, scenario: { name: string }): Promise<any>;
    private constructor();
  }

  class Hub {
    getTunnel(): Promise<any>;
    private constructor();
  }
}
