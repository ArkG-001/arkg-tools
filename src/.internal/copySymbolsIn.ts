import copyObject from './copyObject';
import getSymbolsIn from './getSymbolsIn';

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

export default copySymbolsIn;
