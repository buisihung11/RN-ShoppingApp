export const combineReducer = (contexts) => {
  const CombinedProvider = (props) => {
    const init = props.children;
    const getCombineProvider = Object.keys(contexts).reduce(
      (acc, contextName) => {
        const TheContext = contexts[contextName];
        return (
          <TheContext.Provider value={props.value[contextName]}>
            {acc}
          </TheContext.Provider>
        );
      },
      init
    );

    return getCombineProvider;
  };
};
