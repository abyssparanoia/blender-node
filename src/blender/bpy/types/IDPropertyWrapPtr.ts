import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * IDPropertyWrapPtr
 *
 * https://docs.blender.org/api/current/bpy.types.IDPropertyWrapPtr.html
 */
export class IDPropertyWrapPtr {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  [util.inspect.custom]() {
    return this.accessor
  }
}
