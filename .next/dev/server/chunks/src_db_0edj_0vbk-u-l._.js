module.exports = [
"[project]/src/db/index.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/[root-of-the-server]__1x_br12bny55_._.js",
  "server/chunks/src_db_index_ts_1ci4-7lpv_e1a._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/db/index.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/db/schema.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/node_modules_drizzle-orm_100hy8iaupzjs._.js",
  "server/chunks/src_db_schema_ts_1v71cyrqi2qt9._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/db/schema.ts [app-route] (ecmascript)");
    });
});
}),
];