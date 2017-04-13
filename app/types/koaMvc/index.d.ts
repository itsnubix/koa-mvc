import Application = require("koa");

declare namespace KoaMvc {
  interface Cache {
    get(key: string): any;
    getOrSet(key: string, fn: () => any, ttl?: number): any;
    set(key: string, value: any, ttl?: number): void;
    destroy(key: string): void;
  }

  interface Flash {
    /**
     * Set a flash message for the specified severity
     * @param {string} severity
     * @param {string} message
     */
    flash(severity: string, message: string): void;
    /**
     * Get flash messages for the specified severity
     * @param {string} severity
     * @returns {string[]} Array of messages
     */
    flash(severity: string): string[];
  }

  interface Session {
    flash: {},
  }

  interface State extends Flash {
    getRequestLoggingDetails(): {};
  }

  interface Context extends Application.Context, Flash {
    cache: Cache,

    /**
     * Route parameter dictionary
     */
    params: {},

    /**
     * Renders ejs markup based on the name of the controller and specified view name
     * @param {string} view - Name of the view to render
     * @param {Object} [model] - View model
     */
    render(view: string, model?: {}): void;
    /**
     * Renders ejs markup based on the name of the controller and action, with the specified view model
     * @param {Object} model - View model
     */
    render(model: {}): void;
    /**
     * Renders ejs markup based on the name of the controller and action
     */
    render(): void;

    /**
     * Session dictionary
     */
    session: Session;

    /**
     * Extend state object with properties and methods added by middleware
     */
    state: State;
  }
}

export = KoaMvc;
