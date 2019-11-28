import base from './rollup.config.base'
import { uglify } from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-jsonapi.min.js',
    format: 'iife',
    globals: {
      vue: 'Vue',
    },
    name: 'VueJsonapi',
  },
})

config.plugins.push(uglify({}, minify))

export default config
