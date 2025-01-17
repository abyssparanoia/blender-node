import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { NodeSocket } from './NodeSocket'
import { NodeSocketStandard } from './NodeSocketStandard'

/**
 * NodeSocketBool
 *
 * https://docs.blender.org/api/current/bpy.types.NodeSocketBool.html
 */
export class NodeSocketBool {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * List of node links from or to this socket. Warning: takes O(len(nodetree.links)) time.(readonly)
   * @desc void
   */
  public get links(): void {
    return PythonInterop.getVoid(this.interop, `${this.accessor}.links`)
  }

  /**
   * Input value used for unconnected socket
   * @desc boolean, default False
   */
  public get default_value(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.default_value`)
  }

  /**
   * Input value used for unconnected socket
   * @desc boolean, default False
   */
  public set default_value(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.default_value`, value)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
