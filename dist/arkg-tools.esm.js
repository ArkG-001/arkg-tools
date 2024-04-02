/**
 * 执行 [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * 比较两个值以确定它们是否等价。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要比较的值。
 * @param {*} other 要比较的另一个值。
 * @returns {boolean} 如果值相等，则返回 `true`，否则返回 `false`。
 * @example
 *
 * const object = { 'a': 1 }
 * const other = { 'a': 1 }
 *
 * eq(object, object)
 * // => true
 *
 * eq(object, other)
 * // => false
 *
 * eq('a', 'a')
 * // => true
 *
 * eq('a', Object('a'))
 * // => false
 *
 * eq(NaN, NaN)
 * // => true
 */
function eq(value, other) {
    return value === other || (value !== value && other !== other);
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
        if (eq(array[length][0], key)) {
            return length;
        }
    }
    return -1;
}

var ListCache = /** @class */ (function () {
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @memberOf ListCache
     */
    ListCache.prototype.clear = function () {
        this.__data__ = [];
        this.size = 0;
    };
    /**
     * Removes `key` and its value from the list cache.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    ListCache.prototype.delete = function (key) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);
        if (index < 0) {
            return false;
        }
        var lastIndex = data.length - 1;
        if (index === lastIndex) {
            data.pop();
        }
        else {
            data.splice(index, 1);
        }
        --this.size;
        return true;
    };
    /**
     * Gets the list cache value for `key`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    ListCache.prototype.get = function (key) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
    };
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    ListCache.prototype.has = function (key) {
        return assocIndexOf(this.__data__, key) > -1;
    };
    /**
     * Sets the list cache `key` to `value`.
     *
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    ListCache.prototype.set = function (key, value) {
        var data = this.__data__;
        var index = assocIndexOf(data, key);
        if (index < 0) {
            ++this.size;
            data.push([key, value]);
        }
        else {
            data[index][1] = value;
        }
        return this;
    };
    return ListCache;
}());

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';
var Hash = /** @class */ (function () {
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @memberOf Hash
     */
    Hash.prototype.clear = function () {
        this.__data__ = Object.create(null);
        this.size = 0;
    };
    /**
     * Removes `key` and its value from the hash.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    Hash.prototype.delete = function (key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
    };
    /**
     * Gets the hash value for `key`.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    Hash.prototype.get = function (key) {
        var data = this.__data__;
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    };
    /**
     * Checks if a hash value for `key` exists.
     *
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    Hash.prototype.has = function (key) {
        var data = this.__data__;
        return data[key] !== undefined;
    };
    /**
     * Sets the hash `key` to `value`.
     *
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    Hash.prototype.set = function (key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = value === undefined ? HASH_UNDEFINED : value;
        return this;
    };
    return Hash;
}());

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(_a, key) {
    var __data__ = _a.__data__;
    var data = __data__;
    return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
    var type = typeof value;
    return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean'
        ? value !== '__proto__'
        : value === null;
}
var MapCache = /** @class */ (function () {
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
        var index = -1;
        var length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @memberOf MapCache
     */
    MapCache.prototype.clear = function () {
        this.size = 0;
        this.__data__ = {
            hash: new Hash(),
            map: new Map(),
            string: new Hash(),
        };
    };
    /**
     * Removes `key` and its value from the map.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    MapCache.prototype.delete = function (key) {
        var result = getMapData(this, key)['delete'](key);
        this.size -= result ? 1 : 0;
        return result;
    };
    /**
     * Gets the map value for `key`.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    MapCache.prototype.get = function (key) {
        return getMapData(this, key).get(key);
    };
    /**
     * Checks if a map value for `key` exists.
     *
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    MapCache.prototype.has = function (key) {
        return getMapData(this, key).has(key);
    };
    /**
     * Sets the map `key` to `value`.
     *
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    MapCache.prototype.set = function (key, value) {
        var data = getMapData(this, key);
        var size = data.size;
        data.set(key, value);
        this.size += data.size === size ? 0 : 1;
        return this;
    };
    return MapCache;
}());

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;
var Stack = /** @class */ (function () {
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
        var data = (this.__data__ = new ListCache(entries));
        this.size = data.size;
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @memberOf Stack
     */
    Stack.prototype.clear = function () {
        this.__data__ = new ListCache();
        this.size = 0;
    };
    /**
     * Removes `key` and its value from the stack.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    Stack.prototype.delete = function (key) {
        var data = this.__data__;
        var result = data['delete'](key);
        this.size = data.size;
        return result;
    };
    /**
     * Gets the stack value for `key`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    Stack.prototype.get = function (key) {
        return this.__data__.get(key);
    };
    /**
     * Checks if a stack value for `key` exists.
     *
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    Stack.prototype.has = function (key) {
        return this.__data__.has(key);
    };
    /**
     * Sets the stack `key` to `value`.
     *
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    Stack.prototype.set = function (key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
            }
            data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
    };
    return Stack;
}());

/**
 * A specialized version of `forEach` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
    var index = -1;
    var length = array.length;
    while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
            break;
        }
    }
    return array;
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
    if (key === '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true
        });
    }
    else {
        object[key] = value;
    }
}

/** Used to check objects for own properties. */
var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$2.call(object, key) && eq(objValue, value))) {
        if (value !== 0 || 1 / value === 1 / objValue) {
            baseAssignValue(object, key, value);
        }
    }
    else if (value === undefined && !(key in object)) {
        baseAssignValue(object, key, value);
    }
}

/** Detect free variable `global` from Node. */
var freeGlobal = typeof global === 'object' && global !== null && global.Object === Object && global;

/* global globalThis, self */
/** Detect free variable `globalThis` */
var freeGlobalThis = typeof globalThis === 'object' &&
    globalThis !== null &&
    globalThis.Object === Object &&
    globalThis;
/** Detect free variable `self`. */
var freeSelf = typeof self === 'object' && self !== null && self.Object === Object && self;
/** Used as a reference to the global object. */
var root = freeGlobalThis || freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module === 'object' && module !== null && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
/** Built-in value references. */
var Buffer = moduleExports$1 ? root.Buffer : undefined, allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
/**
 * Creates a clone of `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
        return buffer.slice();
    }
    var length = buffer.length;
    var result = allocUnsafe ? allocUnsafe(length) : buffer.constructor.alloc(length);
    buffer.copy(result);
    return result;
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
    var index = -1;
    var length = source.length;
    array || (array = new Array(length));
    while (++index < length) {
        array[index] = source[index];
    }
    return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
        var key = props_1[_i];
        var newValue = customizer
            ? customizer(object[key], source[key], key, object, source)
            : undefined;
        if (newValue === undefined) {
            newValue = source[key];
        }
        if (isNew) {
            baseAssignValue(object, key, newValue);
        }
        else {
            assignValue(object, key, newValue);
        }
    }
    return object;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolValueOf = Symbol.prototype.valueOf;
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
    return Object(symbolValueOf.call(symbol));
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** Built-in value references. */
var propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbols(object) {
    if (object == null) {
        return [];
    }
    object = Object(object);
    return nativeGetSymbols(object).filter(function (symbol) { return propertyIsEnumerable.call(object, symbol); });
}

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
function getSymbolsIn(object) {
    var result = [];
    while (object) {
        result.push.apply(result, getSymbols(object));
        object = Object.getPrototypeOf(Object(object));
    }
    return result;
}

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
    return copyObject(source, getSymbolsIn(source), object);
}

var toString = Object.prototype.toString;
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return toString.call(value);
}

/**
 * 检查 `value` 是否类似对象。如果 `value` 不是 `null` 并且 `typeof` 结果是 "object"，则视为类似对象。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 类似对象则返回 `true`，否则返回 `false`。
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
function isObjectLike(value) {
    return typeof value === 'object' && value !== null;
}

/**
 * 检查 `value` 是否可能是一个 `arguments` 对象。
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是一个 `arguments` 对象则返回 `true`，否则返回 `false`。
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 */
function isArguments(value) {
    return isObjectLike(value) && getTag(value) === '[object Arguments]';
}

var _a;
/* 用于与其他 `lodash` 方法同名的内置方法的引用。 */
var nativeIsBuffer = (_a = root === null || root === void 0 ? void 0 : root.Buffer) === null || _a === void 0 ? void 0 : _a.isBuffer;
/**
 * 检查 `value` 是否为缓冲区。
 *
 * @since 4.3.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是缓冲区则返回 `true`，否则返回 `false`。
 * @example
 *
 * isBuffer(Buffer.alloc(2))
 * // => true
 *
 * isBuffer(new Uint8Array(2))
 * // => false
 */
var isBuffer = typeof nativeIsBuffer === 'function' ? nativeIsBuffer : function () { return false; };

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length &&
        (type === 'number' ||
            (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 === 0 && value < length);
}

/** Detect free variable `exports`. */
var freeExports = typeof exports === 'object' && exports !== null && !exports.nodeType && exports;
/** Detect free variable `module`. */
var freeModule = freeExports && typeof module === 'object' && module !== null && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node. */
var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node helpers. */
var nodeTypes = (function () {
    try {
        /* Detect public `util.types` helpers for Node v10+. */
        /* Node deprecation code: DEP0103. */
        var typesHelper = freeModule && freeModule.require && freeModule.require('util').types;
        return typesHelper
            ? typesHelper
            : /* Legacy process.binding('util') for Node earlier than v10. */
                freeProcess && freeProcess.binding && freeProcess.binding('util');
    }
    catch (e) { }
})();

/** 用于匹配类型化数组的 `toStringTag` 值的正则表达式。 */
var reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/;
/* Node.js 辅助函数引用。 */
var nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray;
/**
 * 检查 `value` 是否被归类为类型化数组。
 *
 * @since 3.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是类型化数组则返回 `true`，否则返回 `false`。
 *
 * @example
 * // 示例用法：
 *
 * console.log(isTypedArray(new Uint8Array())); // 输出: true
 * console.log(isTypedArray([])); // 输出: false
 */
var isTypedArray = nodeIsTypedArray
    ? function (value) { return nodeIsTypedArray(value); }
    : function (value) { return isObjectLike(value) && reTypedTag.test(getTag(value)); };

/** 用于检查对象是否具有自身属性。 */
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
/**
 * 创建一个由数组类似值的可枚举属性名组成的数组。
 *
 * @private
 * @param {*} value 要查询的值。
 * @param {boolean} inherited 指定是否返回继承的属性名。
 * @returns {Array} 返回属性名的数组。
 *
 * @example
 * // 示例用法：
 *
 * const arr = ['a', 'b', 'c'];
 * const result = arrayLikeKeys(arr, true);
 * console.log(result); // 输出: ['0', '1', '2', 'length']
 */
function arrayLikeKeys(value, inherited) {
    var isArr = Array.isArray(value);
    var isArg = !isArr && isArguments(value);
    var isBuff = !isArr && !isArg && isBuffer(value);
    var isType = !isArr && !isArg && !isBuff && isTypedArray(value);
    var skipIndexes = isArr || isArg || isBuff || isType;
    var length = value.length;
    var result = new Array(skipIndexes ? length : 0);
    var index = skipIndexes ? -1 : length;
    while (++index < length) {
        result[index] = "".concat(index);
    }
    for (var key in value) {
        if ((inherited || hasOwnProperty$1.call(value, key)) &&
            !(skipIndexes &&
                // Safari 9 has enumerable `arguments.length` in strict mode.
                (key === 'length' ||
                    // Skip index properties.
                    isIndex(key, length)))) {
            result.push(key);
        }
    }
    return result;
}

/** 用作各种 `Number` 常量的参考。 */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * 检查 `value` 是否为有效的类数组长度。
 *
 * **注意：** 此方法基于 [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength)。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是有效的长度则返回 `true`，否则返回 `false`。
 * @example
 *
 * isLength(3)
 * // => true
 *
 * isLength(Number.MIN_VALUE)
 * // => false
 *
 * isLength(Infinity)
 * // => false
 *
 * isLength('3')
 * // => false
 */
function isLength(value) {
    return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * 检查 `value` 是否类似数组。如果一个值被视为类似数组，那么它不是一个函数，并且具有一个整数类型的 `value.length` 属性，其值大于或等于 `0`，小于或等于 `Number.MAX_SAFE_INTEGER`。
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 类似数组则返回 `true`，否则返回 `false`。
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 */
function isArrayLike(value) {
    return value != null && typeof value !== 'function' && isLength(value.length);
}

/**
 * 创建一个由对象的自身可枚举属性名组成的数组。
 *
 * **注意：** 非对象值会被强制转换为对象。更多细节请参阅 [ECMAScript 规范](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)。
 *
 * @since 0.1.0
 * @category Object
 * @param {Object} object 要查询的对象。
 * @returns {Array} 返回属性名的数组。
 * @see values, valuesIn
 *
 * @example
 * // 示例用法：
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * const fooInstance = new Foo();
 * const properties = keys(fooInstance);
 * console.log(properties); // 输出: ['a', 'b']（迭代顺序不保证）
 *
 * const str = 'hi';
 * const strProperties = keys(str);
 * console.log(strProperties); // 输出: ['0', '1']
 */
function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : Object.keys(Object(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
    var result = keys(object);
    if (!Array.isArray(object)) {
        result.push.apply(result, getSymbols(object));
    }
    return result;
}

/**
 * Creates an array of own and inherited enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
    var result = [];
    for (var key in object) {
        result.push(key);
    }
    if (!Array.isArray(object)) {
        result.push.apply(result, getSymbolsIn(object));
    }
    return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
    var Ctor = value && value.constructor;
    var proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
    return value === proto;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
    return typeof object.constructor === 'function' && !isPrototype(object)
        ? Object.create(Object.getPrototypeOf(object))
        : {};
}

/**
 * 检查 `value` 是否是
 * [语言类型](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * 的 `Object`。（例如数组，函数，对象，正则表达式，`new Number(0)` 和 `new String('')`）
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是对象则返回 `true`，否则返回 `false`。
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
function isObject(value) {
    var type = typeof value;
    return value != null && (type === 'object' || type === 'function');
}

/**
 * 创建一个由对象的自身和继承的可枚举属性名组成的数组。
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object 要查询的对象。
 * @returns {Array} 返回属性名的数组。
 *
 * @example
 * // 示例用法：
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * const fooInstance = new Foo();
 * const properties = keysIn(fooInstance);
 * console.log(properties); // 输出: ['a', 'b', 'c']（迭代顺序不保证）
 */
function keysIn(object) {
    var result = [];
    for (var key in object) {
        result.push(key);
    }
    return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG$1 = 4;
/** `Object#toString` result references. */
var argsTag = '[object Arguments]';
var arrayTag = '[object Array]';
var boolTag = '[object Boolean]';
var dateTag = '[object Date]';
var errorTag = '[object Error]';
var mapTag = '[object Map]';
var numberTag = '[object Number]';
var objectTag = '[object Object]';
var regexpTag = '[object RegExp]';
var setTag = '[object Set]';
var stringTag = '[object String]';
var symbolTag = '[object Symbol]';
var weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]';
var dataViewTag = '[object DataView]';
var float32Tag = '[object Float32Array]';
var float64Tag = '[object Float64Array]';
var int8Tag = '[object Int8Array]';
var int16Tag = '[object Int16Array]';
var int32Tag = '[object Int32Array]';
var uint8Tag = '[object Uint8Array]';
var uint8ClampedTag = '[object Uint8ClampedArray]';
var uint16Tag = '[object Uint16Array]';
var uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values supported by `clone`. */
var cloneableTags = {};
cloneableTags[argsTag] =
    cloneableTags[arrayTag] =
        cloneableTags[arrayBufferTag] =
            cloneableTags[dataViewTag] =
                cloneableTags[boolTag] =
                    cloneableTags[dateTag] =
                        cloneableTags[float32Tag] =
                            cloneableTags[float64Tag] =
                                cloneableTags[int8Tag] =
                                    cloneableTags[int16Tag] =
                                        cloneableTags[int32Tag] =
                                            cloneableTags[mapTag] =
                                                cloneableTags[numberTag] =
                                                    cloneableTags[objectTag] =
                                                        cloneableTags[regexpTag] =
                                                            cloneableTags[setTag] =
                                                                cloneableTags[stringTag] =
                                                                    cloneableTags[symbolTag] =
                                                                        cloneableTags[uint8Tag] =
                                                                            cloneableTags[uint8ClampedTag] =
                                                                                cloneableTags[uint16Tag] =
                                                                                    cloneableTags[uint32Tag] =
                                                                                        true;
cloneableTags[errorTag] = cloneableTags[weakMapTag] = false;
/** Used to check objects for own properties. */
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
        case arrayBufferTag:
            return cloneArrayBuffer(object);
        case boolTag:
        case dateTag:
            return new Ctor(+object);
        case dataViewTag:
            return cloneDataView(object, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
            return cloneTypedArray(object, isDeep);
        case mapTag:
            return new Ctor();
        case numberTag:
        case stringTag:
            return new Ctor(object);
        case regexpTag:
            return cloneRegExp(object);
        case setTag:
            return new Ctor();
        case symbolTag:
            return cloneSymbol(object);
    }
}
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
    var length = array.length;
    var result = new array.constructor(length);
    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
    }
    return result;
}
/**
 * The base implementation of `clone` and `cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {number} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
    var result;
    var isDeep = bitmask & CLONE_DEEP_FLAG$1;
    var isFlat = bitmask & CLONE_FLAT_FLAG;
    var isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
    if (customizer) {
        result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
        return result;
    }
    if (!isObject(value)) {
        return value;
    }
    var isArr = Array.isArray(value);
    var tag = getTag(value);
    if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
            return copyArray(value, result);
        }
    }
    else {
        var isFunc = typeof value === 'function';
        if (isBuffer(value)) {
            return cloneBuffer(value, isDeep);
        }
        if (tag === objectTag || tag === argsTag || (isFunc && !object)) {
            result = isFlat || isFunc ? {} : initCloneObject(value);
            if (!isDeep) {
                return isFlat
                    ? copySymbolsIn(value, copyObject(value, keysIn(value), result))
                    : copySymbols(value, Object.assign(result, value));
            }
        }
        else {
            if (isFunc || !cloneableTags[tag]) {
                return object ? value : {};
            }
            result = initCloneByTag(value, tag, isDeep);
        }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack());
    var stacked = stack.get(value);
    if (stacked) {
        return stacked;
    }
    stack.set(value, result);
    if (tag === mapTag) {
        value.forEach(function (subValue, key) {
            result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
        });
        return result;
    }
    if (tag === setTag) {
        value.forEach(function (subValue) {
            result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
        });
        return result;
    }
    if (isTypedArray(value)) {
        return result;
    }
    var keysFunc = isFull ? (isFlat ? getAllKeysIn : getAllKeys) : isFlat ? keysIn : keys;
    var props = isArr ? undefined : keysFunc(value);
    arrayEach(props || value, function (subValue, key) {
        if (props) {
            key = subValue;
            subValue = value[key];
        }
        // Recursively populate clone (susceptible to call stack limits).
        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
}

/** 用于组合位掩码以进行克隆。 */
var CLONE_DEEP_FLAG = 1;
var CLONE_SYMBOLS_FLAG = 4;
/**
 * 此方法类似于 `clone`，但它会递归地克隆 `value`。对象继承会被保留。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要递归克隆的值。
 * @returns {*} 返回深度克隆的值。
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

/**
 * 检查 `value` 是否被归类为 `Number` 原始类型或对象。
 *
 * **注意：** 要排除 `Infinity`、`-Infinity` 和 `NaN`，这些被归类为数字，可使用 `Number.isFinite` 方法。
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 若 `value` 是数字则返回 `true`，否则返回 `false`。
 * @see isInteger, toInteger, toNumber
 * @example
 *
 * isNumber(3)
 * // => true
 *
 * isNumber(Number.MIN_VALUE)
 * // => true
 *
 * isNumber(Infinity)
 * // => true
 *
 * isNumber('3')
 * // => false
 */
function isNumber(value) {
    return (typeof value === 'number' || (isObjectLike(value) && getTag(value) === '[object Number]'));
}

/**
 * 将数组拆分为指定大小的块 升维.
 * @param arr 需要分割的数组.
 * @param chunkSize 分割后每个数组的长度.
 * @returns 分割后的升维数组.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * const chunkedArray = splitArray(arr, 3);
 * console.log(chunkedArray); // 输出: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 */
function splitArray(arr, chunkSize) {
    var result = [];
    for (var i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

export { cloneDeep, eq, isArguments, isArrayLike, isBuffer, isLength, isNumber, isObject, isObjectLike, isTypedArray, keys, keysIn, splitArray };
