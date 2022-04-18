import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { Node } from './Node'
import { NodeInternal } from './NodeInternal'
import { CompositorNode } from './CompositorNode'

/**
 * CompositorNodeDiffMatte
 *
 * https://docs.blender.org/api/current/bpy.types.CompositorNodeDiffMatte.html
 */
export class CompositorNodeDiffMatte {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Color distances below this additional threshold are partially keyed
   * @desc float in [0, 1], default 0.0
   */
  public get falloff(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.falloff`)
  }

  /**
   * Color distances below this threshold are keyed
   * @desc float in [0, 1], default 0.0
   */
  public get tolerance(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.tolerance`)
  }

  /**
   * Color distances below this additional threshold are partially keyed
   * @desc float in [0, 1], default 0.0
   */
  public set falloff(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.falloff`, value)
  }

  /**
   * Color distances below this threshold are keyed
   * @desc float in [0, 1], default 0.0
   */
  public set tolerance(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.tolerance`, value)
  }

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
