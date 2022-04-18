import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { Node } from './Node'
import { NodeInternal } from './NodeInternal'
import { CompositorNode } from './CompositorNode'

/**
 * CompositorNodeCornerPin
 *
 * https://docs.blender.org/api/current/bpy.types.CompositorNodeCornerPin.html
 */
export class CompositorNodeCornerPin {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   *
   * @desc void
   */
  public update(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.update`, {})
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
