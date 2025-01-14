import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { Speaker } from './Speaker'

/**
 * BlendDataSpeakers
 *
 * https://docs.blender.org/api/current/bpy.types.BlendDataSpeakers.html
 */
export class BlendDataSpeakers {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Add a new speaker to the main database
   * @desc Speaker
   */
  public new(options: { name?: string }): Speaker {
    return PythonInterop.callClass(this.interop, `${this.accessor}.new`, options, Speaker)
  }

  /**
   * Remove a speaker from the current blendfile
   * @desc void
   */
  public remove(options: { speaker?: unknown; do_unlink?: boolean; do_id_user?: boolean; do_ui_user?: boolean }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.remove`, options)
  }

  /**
   * tag
   * @desc void
   */
  public tag(options: { value?: boolean }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.tag`, options)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
