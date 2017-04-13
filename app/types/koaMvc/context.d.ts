import Application = require("koa");
declare namespace KoaMvc {
  interface Context extends Application.Context {
    /**
     * Renders ejs markup based on the name of the controller and specified view name
     * @param {string} view - Name of the view to render
     * @param {Object} [model] - View model
     */
    render(view: string, model?: object): void;
    /**
     * Renders ejs markup based on the name of the controller and action, with the specified view model
     * @param {Object} model - View model
     */
    render(model: object): void;
    /**
     * Renders ejs markup based on the name of the controller and action
     */
    render(): void;
  }
}

export = KoaMvc;
