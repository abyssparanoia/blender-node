import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * NODE_OT_select
 *
 *
 */
export class NODE_OT_select {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  [util.inspect.custom]() {
    return this.accessor
  }
}
