import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * MESH_OT_rip_edge
 *
 *
 */
export class MESH_OT_rip_edge {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  [util.inspect.custom]() {
    return this.accessor
  }
}
