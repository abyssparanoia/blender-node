import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { bpy_struct } from './bpy_struct'
import { LineStyleModifier } from './LineStyleModifier'
import { LineStyleThicknessModifier } from './LineStyleThicknessModifier'
import { CurveMapping } from './CurveMapping'

/**
 * LineStyleThicknessModifier_Material
 *
 * https://docs.blender.org/api/current/bpy.types.LineStyleThicknessModifier_Material.html
 */
export class LineStyleThicknessModifier_Material {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Curve used for the curve mapping
   * @desc CurveMapping, (readonly)
   */
  public get curve(): CurveMapping {
    return PythonInterop.getClass(this.interop, `${this.accessor}.curve`, CurveMapping)
  }

  /**
   * Type of the modifier
   * @desc enum in ['ALONG_STROKE', 'CALLIGRAPHY', 'CREASE_ANGLE', 'CURVATURE_3D', 'DISTANCE_FROM_CAMERA', 'DISTANCE_FROM_OBJECT', 'MATERIAL', 'NOISE', 'TANGENT'], default 'ALONG_STROKE', (readonly)
   */
  public get type():
    | 'ALONG_STROKE'
    | 'CALLIGRAPHY'
    | 'CREASE_ANGLE'
    | 'CURVATURE_3D'
    | 'DISTANCE_FROM_CAMERA'
    | 'DISTANCE_FROM_OBJECT'
    | 'MATERIAL'
    | 'NOISE'
    | 'TANGENT' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.type`)
  }

  /**
   * Specify how the modifier value is blended into the base value
   * @desc enum in ['MIX', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'DIFFERENCE', 'MINIMUM', 'MAXIMUM'], default 'MIX'
   */
  public get blend(): 'MIX' | 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'DIFFERENCE' | 'MINIMUM' | 'MAXIMUM' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.blend`)
  }

  /**
   * True if the modifier tab is expanded
   * @desc boolean, default False
   */
  public get expanded(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.expanded`)
  }

  /**
   * Influence factor by which the modifier changes the property
   * @desc float in [0, 1], default 0.0
   */
  public get influence(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.influence`)
  }

  /**
   * Invert the fade-out direction of the linear mapping
   * @desc boolean, default False
   */
  public get invert(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.invert`)
  }

  /**
   * Select the mapping type
   * @desc enum in ['LINEAR', 'CURVE'], default 'LINEAR'
   */
  public get mapping(): 'LINEAR' | 'CURVE' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.mapping`)
  }

  /**
   * Specify which material attribute is used
   * @desc enum in ['LINE', 'LINE_R', 'LINE_G', 'LINE_B', 'LINE_A', 'DIFF', 'DIFF_R', 'DIFF_G', 'DIFF_B', 'SPEC', 'SPEC_R', 'SPEC_G', 'SPEC_B', 'SPEC_HARD', 'ALPHA'], default 'LINE'
   */
  public get material_attribute():
    | 'LINE'
    | 'LINE_R'
    | 'LINE_G'
    | 'LINE_B'
    | 'LINE_A'
    | 'DIFF'
    | 'DIFF_R'
    | 'DIFF_G'
    | 'DIFF_B'
    | 'SPEC'
    | 'SPEC_R'
    | 'SPEC_G'
    | 'SPEC_B'
    | 'SPEC_HARD'
    | 'ALPHA' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.material_attribute`)
  }

  /**
   * Name of the modifier
   * @desc string, default '', (never None)
   */
  public get name(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.name`)
  }

  /**
   * Enable or disable this modifier during stroke rendering
   * @desc boolean, default False
   */
  public get use(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.use`)
  }

  /**
   * Maximum output value of the mapping
   * @desc float in [-inf, inf], default 0.0
   */
  public get value_max(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.value_max`)
  }

  /**
   * Minimum output value of the mapping
   * @desc float in [-inf, inf], default 0.0
   */
  public get value_min(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.value_min`)
  }

  /**
   * Specify how the modifier value is blended into the base value
   * @desc enum in ['MIX', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'DIFFERENCE', 'MINIMUM', 'MAXIMUM'], default 'MIX'
   */
  public set blend(value: 'MIX' | 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE' | 'DIFFERENCE' | 'MINIMUM' | 'MAXIMUM') {
    PythonInterop.setEnum(this.interop, `${this.accessor}.blend`, value)
  }

  /**
   * True if the modifier tab is expanded
   * @desc boolean, default False
   */
  public set expanded(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.expanded`, value)
  }

  /**
   * Influence factor by which the modifier changes the property
   * @desc float in [0, 1], default 0.0
   */
  public set influence(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.influence`, value)
  }

  /**
   * Invert the fade-out direction of the linear mapping
   * @desc boolean, default False
   */
  public set invert(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.invert`, value)
  }

  /**
   * Select the mapping type
   * @desc enum in ['LINEAR', 'CURVE'], default 'LINEAR'
   */
  public set mapping(value: 'LINEAR' | 'CURVE') {
    PythonInterop.setEnum(this.interop, `${this.accessor}.mapping`, value)
  }

  /**
   * Specify which material attribute is used
   * @desc enum in ['LINE', 'LINE_R', 'LINE_G', 'LINE_B', 'LINE_A', 'DIFF', 'DIFF_R', 'DIFF_G', 'DIFF_B', 'SPEC', 'SPEC_R', 'SPEC_G', 'SPEC_B', 'SPEC_HARD', 'ALPHA'], default 'LINE'
   */
  public set material_attribute(
    value:
      | 'LINE'
      | 'LINE_R'
      | 'LINE_G'
      | 'LINE_B'
      | 'LINE_A'
      | 'DIFF'
      | 'DIFF_R'
      | 'DIFF_G'
      | 'DIFF_B'
      | 'SPEC'
      | 'SPEC_R'
      | 'SPEC_G'
      | 'SPEC_B'
      | 'SPEC_HARD'
      | 'ALPHA'
  ) {
    PythonInterop.setEnum(this.interop, `${this.accessor}.material_attribute`, value)
  }

  /**
   * Name of the modifier
   * @desc string, default '', (never None)
   */
  public set name(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.name`, value)
  }

  /**
   * Enable or disable this modifier during stroke rendering
   * @desc boolean, default False
   */
  public set use(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.use`, value)
  }

  /**
   * Maximum output value of the mapping
   * @desc float in [-inf, inf], default 0.0
   */
  public set value_max(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.value_max`, value)
  }

  /**
   * Minimum output value of the mapping
   * @desc float in [-inf, inf], default 0.0
   */
  public set value_min(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.value_min`, value)
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
