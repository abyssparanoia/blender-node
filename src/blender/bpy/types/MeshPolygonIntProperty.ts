import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * MeshPolygonIntProperty
 *
 * https://docs.blender.org/api/current/bpy.types.MeshPolygonIntProperty.html
 */
export class MeshPolygonIntProperty {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   *
   * @desc int in [-inf, inf], default 0
   */
  public get value(): number {
    return PythonInterop.getInteger(this.interop, `${this.accessor}.value`)
  }

  /**
   *
   * @desc int in [-inf, inf], default 0
   */
  public set value(value: number) {
    PythonInterop.setInteger(this.interop, `${this.accessor}.value`, value)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
