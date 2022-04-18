import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * MeshPolygonStringProperty
 *
 * https://docs.blender.org/api/current/bpy.types.MeshPolygonStringProperty.html
 */
export class MeshPolygonStringProperty {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   *
   * @desc string, default '', (never None)
   */
  public get value(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.value`)
  }

  /**
   *
   * @desc string, default '', (never None)
   */
  public set value(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.value`, value)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
