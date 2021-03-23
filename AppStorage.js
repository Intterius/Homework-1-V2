export class AppStorage {
  constructor(name) {
    if (!name) {
      console.error(`${name} field is required.`);
    }

    this.name = name;

    if (!this.state) this.state = '';
  }

  get state() {
    return this.getState(this.name);
  }

  set state(value) {
    return this.setState(this.name, value);
  }

  getState(name = "") {
    try {
      const state = localStorage.getItem(name);

      return state && JSON.parse(state);
    } catch (e) {
      console.error(`There are no items in store with key "${name}"`);
    }
  }

  setState(name, value = {}) {
    if (!name) return;

    try {
      localStorage.setItem(name, JSON.stringify(value));

      return true;
    } catch (e) {
      console.error(
        `Can't set ${name} property in storage with value: ${JSON.stringify(
          value
        )}`
      );
    }
  }
}
