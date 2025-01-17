import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { Constraint } from './Constraint'
import { BlenderObject } from './BlenderObject'

/**
 * LockedTrackConstraint
 *
 * https://docs.blender.org/api/current/bpy.types.LockedTrackConstraint.html
 */
export class LockedTrackConstraint {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Target along length of bone: Head=0, Tail=1
   * @desc float in [0, 1], default 0.0
   */
  public get head_tail(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.head_tail`)
  }

  /**
   * Axis that points upward
   * @desc enum in ['LOCK_X', 'LOCK_Y', 'LOCK_Z'], default 'LOCK_X'
   */
  public get lock_axis(): 'LOCK_X' | 'LOCK_Y' | 'LOCK_Z' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.lock_axis`)
  }

  /**
   * Armature bone, mesh or lattice vertex group, …
   * @desc string, default '', (never None)
   */
  public get subtarget(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.subtarget`)
  }

  /**
   * Target object
   * @desc Object
   */
  public get target(): BlenderObject {
    return PythonInterop.getClass(this.interop, `${this.accessor}.target`, BlenderObject)
  }

  /**
   * Axis that points to the target object
   * @desc enum in ['TRACK_X', 'TRACK_Y', 'TRACK_Z', 'TRACK_NEGATIVE_X', 'TRACK_NEGATIVE_Y', 'TRACK_NEGATIVE_Z'], default 'TRACK_X'
   */
  public get track_axis():
    | 'TRACK_X'
    | 'TRACK_Y'
    | 'TRACK_Z'
    | 'TRACK_NEGATIVE_X'
    | 'TRACK_NEGATIVE_Y'
    | 'TRACK_NEGATIVE_Z' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.track_axis`)
  }

  /**
   * Follow shape of B-Bone segments when calculating Head/Tail position
   * @desc boolean, default False
   */
  public get use_bbone_shape(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.use_bbone_shape`)
  }

  /**
   * Target along length of bone: Head=0, Tail=1
   * @desc float in [0, 1], default 0.0
   */
  public set head_tail(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.head_tail`, value)
  }

  /**
   * Axis that points upward
   * @desc enum in ['LOCK_X', 'LOCK_Y', 'LOCK_Z'], default 'LOCK_X'
   */
  public set lock_axis(value: 'LOCK_X' | 'LOCK_Y' | 'LOCK_Z') {
    PythonInterop.setEnum(this.interop, `${this.accessor}.lock_axis`, value)
  }

  /**
   * Armature bone, mesh or lattice vertex group, …
   * @desc string, default '', (never None)
   */
  public set subtarget(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.subtarget`, value)
  }

  /**
   * Target object
   * @desc Object
   */
  public set target(value: BlenderObject) {
    PythonInterop.setClass(this.interop, `${this.accessor}.target`, value)
  }

  /**
   * Axis that points to the target object
   * @desc enum in ['TRACK_X', 'TRACK_Y', 'TRACK_Z', 'TRACK_NEGATIVE_X', 'TRACK_NEGATIVE_Y', 'TRACK_NEGATIVE_Z'], default 'TRACK_X'
   */
  public set track_axis(
    value: 'TRACK_X' | 'TRACK_Y' | 'TRACK_Z' | 'TRACK_NEGATIVE_X' | 'TRACK_NEGATIVE_Y' | 'TRACK_NEGATIVE_Z'
  ) {
    PythonInterop.setEnum(this.interop, `${this.accessor}.track_axis`, value)
  }

  /**
   * Follow shape of B-Bone segments when calculating Head/Tail position
   * @desc boolean, default False
   */
  public set use_bbone_shape(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.use_bbone_shape`, value)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
