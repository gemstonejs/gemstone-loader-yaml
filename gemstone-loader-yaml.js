/*
**  GemstoneJS -- Gemstone JavaScript Technology Stack
**  Copyright (c) 2016-2017 Gemstone Project <http://gemstonejs.com>
**  Licensed under Apache License 2.0 <https://spdx.org/licenses/Apache-2.0>
*/

/*  load external requirements  */
const loaderUtils = require("loader-utils")
const jsYAML      = require("js-yaml")

/*  the exported Webpack loader function  */
module.exports = function (content) {
    /*  determine Webpack loader query parameters  */
    const options = Object.assign({}, {
    }, loaderUtils.getOptions(this), this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : null)
    void (options)

    /*  indicate to Webpack that our results are
        fully deterministic and can be cached  */
    this.cacheable(true)

    /*  parse YAML  */
    try {
        content = jsYAML.safeLoad(content, {
            filename: this.resourcePath,
            schema: jsYAML.DEFAULT_SAFE_SCHEMA,
            onWarning: (warning) => {
                this.emitError(`gemstone-loader-yaml: [js-YAML]: ERROR: ${warning}`)
            }
        })
    }
    catch (ex) {
        this.emitError(`gemstone-loader-yaml: [js-YAML]: ERROR: ${ex}`)
    }

    /*  export result as a JavaScript string  */
    content = `module.exports = ${JSON.stringify(content)}`

    return content
}

