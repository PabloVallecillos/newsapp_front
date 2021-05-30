/*
* Implementation of middlewares
* @see https://blog.logrocket.com/vue-middleware-pipelines/
* */
function middlewarePipeline(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }

  return (param) => {
    /*
    * @see https://github.com/Dotunj/vue-middleware-pipelines/issues/1
    *
    * If we have multiple middleware on a single route does not properly redirect
    *
    * This line basically whenever my middleware call the next() function,
    * it calls the middleware pipeline callback as follows
    */
    if (param) context.next(param);
    const nextPipeline = middlewarePipeline(
      context, middleware, index + 1,
    );
    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export default middlewarePipeline;
