import DollarJsonapi from './dollar-jsonapi'
import { Globals } from './params'
import DefaultCache from './cache'

const plugin = DollarJsonapi

function install (Vue, { Cache = DefaultCache, client }) {
  if (install.installed) return
  install.installed = true

  Globals.Vue = Vue
  Globals.defaultCache = new Cache()
  Globals.defaultClient = client

  // Options merging
  Vue.config.optionMergeStrategies.jsonapi = Vue.config.optionMergeStrategies.computed

  // Lazy creation
  Object.defineProperty(Vue.prototype, '$jsonapi', {
    get () {
      if (!this.$_jsonapi) {
        this.$_jsonapi = new DollarJsonapi()
      }
      return this.$_jsonapi
    },
  })

  Vue.mixin({
    created () {
      const queries = this.$options.jsonapi
      if (queries) {
        const queriesNames = Object.keys(queries)
        queriesNames.forEach(name => {
          this.$jsonapi.addQuery(this, name, queries[name])
        })
      }
    },
    beforeDestroy () {
      if (this.$_jsonapi) {
        this.$_jsonapi.destroy()
      }
    },
  })
}

plugin.install = install

export default plugin

export { default as Cache } from './cache'
