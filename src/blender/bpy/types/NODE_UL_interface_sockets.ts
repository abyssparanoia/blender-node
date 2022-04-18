import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { UIList } from './UIList'

/**
 * NODE_UL_interface_sockets
 *
 * https://docs.blender.org/api/current/bpy.types.NODE_UL_interface_sockets.html
 */
export class NODE_UL_interface_sockets {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   *
   * @desc void
   */
  public draw_item(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.draw_item`, {})
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
