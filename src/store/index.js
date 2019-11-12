const register = new Map();

const store = {
    withActions(actions) {
        actions.forEach(([action, handler]) => {
            let handlers = register.get(action);
            if (!handlers) {
                handlers = [];
            }
            handlers.push(handler);

            register.set(action, handlers);
        });
    },
    async dispatch(action, payload) {
        const handlers = register.get(action);
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

window.onunload = function () {
    if (register.size > 0) {
        register.clear();
    }
};

export default store;
