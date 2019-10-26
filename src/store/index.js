const store = {
    register: new Map(),
    addEventListener(evtName, fn) {
        let handlers = this.register.get(evtName);
        if (!handlers) {
            handlers = [];
        }
        handlers.push(fn);

        this.register.set(evtName, handlers);
    },
    async dispatch(action, payload) {
        const handlers = this.register.get(action);
        if (handlers) {
            return Promise.all(
                handlers.map(
                    handler => new Promise(resolve =>
                        resolve(handler(payload))
                    )
                )
            );
        }

        return Promise.resolve();
    }
}

export default store;
