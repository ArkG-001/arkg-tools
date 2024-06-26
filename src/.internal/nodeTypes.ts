import freeGlobal from './freeGlobal';

/** Detect free variable `exports`. */
const freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;

/** Detect free variable `module`. */
const freeModule =
    freeExports && typeof module === 'object' && module !== null && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
const moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node. */
const freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node helpers. */
const nodeTypes = (() => {
    try {
        /* Detect public `util.types` helpers for Node v10+. */
        /* Node deprecation code: DEP0103. */
        const typesHelper = freeModule && freeModule.require && freeModule.require('util').types;
        return typesHelper
            ? typesHelper
            : /* Legacy process.binding('util') for Node earlier than v10. */
              freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
})();

export default nodeTypes;
