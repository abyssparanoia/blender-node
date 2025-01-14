import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'

/**
 * ImagePreview
 *
 * https://docs.blender.org/api/current/bpy.types.ImagePreview.html
 */
export class ImagePreview {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Unique integer identifying this preview as an icon (zero means invalid)
   * @desc int in [-inf, inf], default 0, (readonly)
   */
  public get icon_id(): number {
    return PythonInterop.getInteger(this.interop, `${this.accessor}.icon_id`)
  }

  /**
   * Icon pixels, as bytes (always RGBA 32bits)
   * @desc int in [-inf, inf], default 0
   */
  public get icon_pixels(): number {
    return PythonInterop.getInteger(this.interop, `${this.accessor}.icon_pixels`)
  }

  /**
   * Icon pixels components, as floats (RGBA concatenated values)
   * @desc float in [-inf, inf], default 0.0
   */
  public get icon_pixels_float(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.icon_pixels_float`)
  }

  /**
   * Width and height in pixels
   * @desc int array of 2 items in [-inf, inf], default (0, 0)
   */
  public get icon_size(): [number, number] {
    return PythonInterop.getArray(this.interop, `${this.accessor}.icon_size`, 'number', 2)
  }

  /**
   * Image pixels, as bytes (always RGBA 32bits)
   * @desc int in [-inf, inf], default 0
   */
  public get image_pixels(): number {
    return PythonInterop.getInteger(this.interop, `${this.accessor}.image_pixels`)
  }

  /**
   * Image pixels components, as floats (RGBA concatenated values)
   * @desc float in [-inf, inf], default 0.0
   */
  public get image_pixels_float(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.image_pixels_float`)
  }

  /**
   * Width and height in pixels
   * @desc int array of 2 items in [-inf, inf], default (0, 0)
   */
  public get image_size(): [number, number] {
    return PythonInterop.getArray(this.interop, `${this.accessor}.image_size`, 'number', 2)
  }

  /**
   * True if this preview icon has been modified by py script,and is no more auto-generated by Blender
   * @desc boolean, default False
   */
  public get is_icon_custom(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.is_icon_custom`)
  }

  /**
   * True if this preview image has been modified by py script,and is no more auto-generated by Blender
   * @desc boolean, default False
   */
  public get is_image_custom(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.is_image_custom`)
  }

  /**
   * Icon pixels, as bytes (always RGBA 32bits)
   * @desc int in [-inf, inf], default 0
   */
  public set icon_pixels(value: number) {
    PythonInterop.setInteger(this.interop, `${this.accessor}.icon_pixels`, value)
  }

  /**
   * Icon pixels components, as floats (RGBA concatenated values)
   * @desc float in [-inf, inf], default 0.0
   */
  public set icon_pixels_float(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.icon_pixels_float`, value)
  }

  /**
   * Width and height in pixels
   * @desc int array of 2 items in [-inf, inf], default (0, 0)
   */
  public set icon_size(value: [number, number]) {
    PythonInterop.setArray(this.interop, `${this.accessor}.icon_size`, value)
  }

  /**
   * Image pixels, as bytes (always RGBA 32bits)
   * @desc int in [-inf, inf], default 0
   */
  public set image_pixels(value: number) {
    PythonInterop.setInteger(this.interop, `${this.accessor}.image_pixels`, value)
  }

  /**
   * Image pixels components, as floats (RGBA concatenated values)
   * @desc float in [-inf, inf], default 0.0
   */
  public set image_pixels_float(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.image_pixels_float`, value)
  }

  /**
   * Width and height in pixels
   * @desc int array of 2 items in [-inf, inf], default (0, 0)
   */
  public set image_size(value: [number, number]) {
    PythonInterop.setArray(this.interop, `${this.accessor}.image_size`, value)
  }

  /**
   * True if this preview icon has been modified by py script,and is no more auto-generated by Blender
   * @desc boolean, default False
   */
  public set is_icon_custom(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.is_icon_custom`, value)
  }

  /**
   * True if this preview image has been modified by py script,and is no more auto-generated by Blender
   * @desc boolean, default False
   */
  public set is_image_custom(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.is_image_custom`, value)
  }

  /**
   * Reload the preview from its source path
   * @desc void
   */
  public reload(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.reload`, {})
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
