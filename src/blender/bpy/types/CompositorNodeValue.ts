import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { Node } from './Node'
import { NodeInternal } from './NodeInternal'
import { CompositorNode } from './CompositorNode'

/**
 * CompositorNodeValue
 *
 * https://docs.blender.org/api/current/bpy.types.CompositorNodeValue.html
 */
export class CompositorNodeValue {
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
