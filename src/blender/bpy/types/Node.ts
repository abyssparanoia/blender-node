import * as util from 'util'
import { BlenderCollection, Indexable } from '../../collection'
import { BlenderInterop } from '../../../worker/interop'
import { PythonInterop } from '../../../python/interop'
import { NodeInputs } from './NodeInputs'
import { NodeSocket } from './NodeSocket'
import { NodeLink } from './NodeLink'
import { NodeOutputs } from './NodeOutputs'

/**
 * Node
 *
 * https://docs.blender.org/api/current/bpy.types.Node.html
 */
export class Node {
  constructor(public interop: BlenderInterop, public accessor: string) {}

  /**
   * Absolute bounding box dimensions of the node
   * @desc float array of 2 items in [-inf, inf], default (0.0, 0.0), (readonly)
   */
  public get dimensions(): [number, number] {
    return PythonInterop.getArray(this.interop, `${this.accessor}.dimensions`, 'number', 2)
  }

  /**
   *
   * @desc NodeInputs bpy_prop_collection of NodeSocket, (readonly)
   */
  public get inputs(): BlenderCollection<NodeSocket> & Indexable<NodeSocket> & NodeInputs {
    return BlenderCollection.createSpecialized(this.interop, `${this.accessor}.inputs`, NodeInputs, NodeSocket)
  }

  /**
   * Internal input-to-output connections for muting
   * @desc bpy_prop_collection of NodeLink, (readonly)
   */
  public get internal_links(): BlenderCollection<NodeLink> & Indexable<NodeLink> {
    return BlenderCollection.createGeneric(this.interop, `${this.accessor}.internal_links`, NodeLink)
  }

  /**
   *
   * @desc NodeOutputs bpy_prop_collection of NodeSocket, (readonly)
   */
  public get outputs(): BlenderCollection<NodeSocket> & Indexable<NodeSocket> & NodeOutputs {
    return BlenderCollection.createSpecialized(this.interop, `${this.accessor}.outputs`, NodeOutputs, NodeSocket)
  }

  /**
   * Node type (deprecated, use bl_static_type or bl_idname for the actual identifier string)
   * @desc enum in ['CUSTOM'], default 'CUSTOM', (readonly)
   */
  public get type(): 'CUSTOM' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.type`)
  }

  /**
   *
   * @desc string, default '', (never None)
   */
  public get bl_description(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.bl_description`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_height_default(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_height_default`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_height_max(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_height_max`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_height_min(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_height_min`)
  }

  /**
   * The node icon
   * @desc enum in ['NONE', 'QUESTION', 'ERROR', 'CANCEL', 'TRIA_RIGHT', 'TRIA_DOWN', 'TRIA_LEFT', 'TRIA_UP', 'ARROW_LEFTRIGHT', 'PLUS', 'DISCLOSURE_TRI_RIGHT', 'DISCLOSURE_TRI_DOWN', 'RADIOBUT_OFF', 'RADIOBUT_ON', 'MENU_PANEL', 'BLENDER', 'GRIP', 'DOT', 'COLLAPSEMENU', 'X', 'DUPLICATE', 'TRASH', 'COLLECTION_NEW', 'OPTIONS', 'NODE', 'NODE_SEL', 'WINDOW', 'WORKSPACE', 'RIGHTARROW_THIN', 'BORDERMOVE', 'VIEWZOOM', 'ADD', 'REMOVE', 'PANEL_CLOSE', 'COPY_ID', 'EYEDROPPER', 'CHECKMARK', 'AUTO', 'CHECKBOX_DEHLT', 'CHECKBOX_HLT', 'UNLOCKED', 'LOCKED', 'UNPINNED', 'PINNED', 'SCREEN_BACK', 'RIGHTARROW', 'DOWNARROW_HLT', 'FCURVE_SNAPSHOT', 'OBJECT_HIDDEN', 'TOPBAR', 'STATUSBAR', 'PLUGIN', 'HELP', 'GHOST_ENABLED', 'COLOR', 'UNLINKED', 'LINKED', 'HAND', 'ZOOM_ALL', 'ZOOM_SELECTED', 'ZOOM_PREVIOUS', 'ZOOM_IN', 'ZOOM_OUT', 'DRIVER_DISTANCE', 'DRIVER_ROTATIONAL_DIFFERENCE', 'DRIVER_TRANSFORM', 'FREEZE', 'STYLUS_PRESSURE', 'GHOST_DISABLED', 'FILE_NEW', 'FILE_TICK', 'QUIT', 'URL', 'RECOVER_LAST', 'THREE_DOTS', 'FULLSCREEN_ENTER', 'FULLSCREEN_EXIT', 'LIGHT', 'MATERIAL', 'TEXTURE', 'ANIM', 'WORLD', 'SCENE', 'OUTPUT', 'SCRIPT', 'PARTICLES', 'PHYSICS', 'SPEAKER', 'TOOL_SETTINGS', 'SHADERFX', 'MODIFIER', 'BLANK1', 'FAKE_USER_OFF', 'FAKE_USER_ON', 'VIEW3D', 'GRAPH', 'OUTLINER', 'PROPERTIES', 'FILEBROWSER', 'IMAGE', 'INFO', 'SEQUENCE', 'TEXT', 'SOUND', 'ACTION', 'NLA', 'PREFERENCES', 'TIME', 'NODETREE', 'CONSOLE', 'TRACKER', 'ASSET_MANAGER', 'NODE_COMPOSITING', 'NODE_TEXTURE', 'NODE_MATERIAL', 'UV', 'OBJECT_DATAMODE', 'EDITMODE_HLT', 'UV_DATA', 'VPAINT_HLT', 'TPAINT_HLT', 'WPAINT_HLT', 'SCULPTMODE_HLT', 'POSE_HLT', 'PARTICLEMODE', 'TRACKING', 'TRACKING_BACKWARDS', 'TRACKING_FORWARDS', 'TRACKING_BACKWARDS_SINGLE', 'TRACKING_FORWARDS_SINGLE', 'TRACKING_CLEAR_BACKWARDS', 'TRACKING_CLEAR_FORWARDS', 'TRACKING_REFINE_BACKWARDS', 'TRACKING_REFINE_FORWARDS', 'SCENE_DATA', 'RENDERLAYERS', 'WORLD_DATA', 'OBJECT_DATA', 'MESH_DATA', 'CURVE_DATA', 'META_DATA', 'LATTICE_DATA', 'LIGHT_DATA', 'MATERIAL_DATA', 'TEXTURE_DATA', 'ANIM_DATA', 'CAMERA_DATA', 'PARTICLE_DATA', 'LIBRARY_DATA_DIRECT', 'GROUP', 'ARMATURE_DATA', 'COMMUNITY', 'BONE_DATA', 'CONSTRAINT', 'SHAPEKEY_DATA', 'CONSTRAINT_BONE', 'CAMERA_STEREO', 'PACKAGE', 'UGLYPACKAGE', 'EXPERIMENTAL', 'BRUSH_DATA', 'IMAGE_DATA', 'FILE', 'FCURVE', 'FONT_DATA', 'RENDER_RESULT', 'SURFACE_DATA', 'EMPTY_DATA', 'PRESET', 'RENDER_ANIMATION', 'RENDER_STILL', 'LIBRARY_DATA_BROKEN', 'BOIDS', 'STRANDS', 'LIBRARY_DATA_INDIRECT', 'GREASEPENCIL', 'LINE_DATA', 'LIBRARY_DATA_OVERRIDE', 'GROUP_BONE', 'GROUP_VERTEX', 'GROUP_VCOL', 'GROUP_UVS', 'FACE_MAPS', 'RNA', 'RNA_ADD', 'MOUSE_LMB', 'MOUSE_MMB', 'MOUSE_RMB', 'MOUSE_MOVE', 'MOUSE_LMB_DRAG', 'MOUSE_MMB_DRAG', 'MOUSE_RMB_DRAG', 'MEMORY', 'PRESET_NEW', 'DECORATE', 'DECORATE_KEYFRAME', 'DECORATE_ANIMATE', 'DECORATE_DRIVER', 'DECORATE_LINKED', 'DECORATE_LIBRARY_OVERRIDE', 'DECORATE_UNLOCKED', 'DECORATE_LOCKED', 'DECORATE_OVERRIDE', 'FUND', 'TRACKER_DATA', 'HEART', 'ORPHAN_DATA', 'USER', 'SYSTEM', 'SETTINGS', 'OUTLINER_OB_EMPTY', 'OUTLINER_OB_MESH', 'OUTLINER_OB_CURVE', 'OUTLINER_OB_LATTICE', 'OUTLINER_OB_META', 'OUTLINER_OB_LIGHT', 'OUTLINER_OB_CAMERA', 'OUTLINER_OB_ARMATURE', 'OUTLINER_OB_FONT', 'OUTLINER_OB_SURFACE', 'OUTLINER_OB_SPEAKER', 'OUTLINER_OB_FORCE_FIELD', 'OUTLINER_OB_GROUP_INSTANCE', 'OUTLINER_OB_GREASEPENCIL', 'OUTLINER_OB_LIGHTPROBE', 'OUTLINER_OB_IMAGE', 'RESTRICT_COLOR_OFF', 'RESTRICT_COLOR_ON', 'HIDE_ON', 'HIDE_OFF', 'RESTRICT_SELECT_ON', 'RESTRICT_SELECT_OFF', 'RESTRICT_RENDER_ON', 'RESTRICT_RENDER_OFF', 'RESTRICT_INSTANCED_OFF', 'OUTLINER_DATA_EMPTY', 'OUTLINER_DATA_MESH', 'OUTLINER_DATA_CURVE', 'OUTLINER_DATA_LATTICE', 'OUTLINER_DATA_META', 'OUTLINER_DATA_LIGHT', 'OUTLINER_DATA_CAMERA', 'OUTLINER_DATA_ARMATURE', 'OUTLINER_DATA_FONT', 'OUTLINER_DATA_SURFACE', 'OUTLINER_DATA_SPEAKER', 'OUTLINER_DATA_LIGHTPROBE', 'OUTLINER_DATA_GP_LAYER', 'OUTLINER_DATA_GREASEPENCIL', 'GP_SELECT_POINTS', 'GP_SELECT_STROKES', 'GP_MULTIFRAME_EDITING', 'GP_ONLY_SELECTED', 'GP_SELECT_BETWEEN_STROKES', 'MODIFIER_OFF', 'MODIFIER_ON', 'ONIONSKIN_OFF', 'ONIONSKIN_ON', 'RESTRICT_VIEW_ON', 'RESTRICT_VIEW_OFF', 'RESTRICT_INSTANCED_ON', 'MESH_PLANE', 'MESH_CUBE', 'MESH_CIRCLE', 'MESH_UVSPHERE', 'MESH_ICOSPHERE', 'MESH_GRID', 'MESH_MONKEY', 'MESH_CYLINDER', 'MESH_TORUS', 'MESH_CONE', 'MESH_CAPSULE', 'EMPTY_SINGLE_ARROW', 'LIGHT_POINT', 'LIGHT_SUN', 'LIGHT_SPOT', 'LIGHT_HEMI', 'LIGHT_AREA', 'CUBE', 'SPHERE', 'CONE', 'META_PLANE', 'META_CUBE', 'META_BALL', 'META_ELLIPSOID', 'META_CAPSULE', 'SURFACE_NCURVE', 'SURFACE_NCIRCLE', 'SURFACE_NSURFACE', 'SURFACE_NCYLINDER', 'SURFACE_NSPHERE', 'SURFACE_NTORUS', 'EMPTY_AXIS', 'STROKE', 'EMPTY_ARROWS', 'CURVE_BEZCURVE', 'CURVE_BEZCIRCLE', 'CURVE_NCURVE', 'CURVE_NCIRCLE', 'CURVE_PATH', 'LIGHTPROBE_CUBEMAP', 'LIGHTPROBE_PLANAR', 'LIGHTPROBE_GRID', 'COLOR_RED', 'COLOR_GREEN', 'COLOR_BLUE', 'TRIA_RIGHT_BAR', 'TRIA_DOWN_BAR', 'TRIA_LEFT_BAR', 'TRIA_UP_BAR', 'FORCE_FORCE', 'FORCE_WIND', 'FORCE_VORTEX', 'FORCE_MAGNETIC', 'FORCE_HARMONIC', 'FORCE_CHARGE', 'FORCE_LENNARDJONES', 'FORCE_TEXTURE', 'FORCE_CURVE', 'FORCE_BOID', 'FORCE_TURBULENCE', 'FORCE_DRAG', 'FORCE_SMOKEFLOW', 'RIGID_BODY', 'RIGID_BODY_CONSTRAINT', 'IMAGE_PLANE', 'IMAGE_BACKGROUND', 'IMAGE_REFERENCE', 'NODE_INSERT_ON', 'NODE_INSERT_OFF', 'NODE_TOP', 'NODE_SIDE', 'NODE_CORNER', 'SELECT_SET', 'SELECT_EXTEND', 'SELECT_SUBTRACT', 'SELECT_INTERSECT', 'SELECT_DIFFERENCE', 'ALIGN_LEFT', 'ALIGN_CENTER', 'ALIGN_RIGHT', 'ALIGN_JUSTIFY', 'ALIGN_FLUSH', 'ALIGN_TOP', 'ALIGN_MIDDLE', 'ALIGN_BOTTOM', 'BOLD', 'ITALIC', 'UNDERLINE', 'SMALL_CAPS', 'CON_ACTION', 'HOLDOUT_OFF', 'HOLDOUT_ON', 'INDIRECT_ONLY_OFF', 'INDIRECT_ONLY_ON', 'CON_CAMERASOLVER', 'CON_FOLLOWTRACK', 'CON_OBJECTSOLVER', 'CON_LOCLIKE', 'CON_ROTLIKE', 'CON_SIZELIKE', 'CON_TRANSLIKE', 'CON_DISTLIMIT', 'CON_LOCLIMIT', 'CON_ROTLIMIT', 'CON_SIZELIMIT', 'CON_SAMEVOL', 'CON_TRANSFORM', 'CON_TRANSFORM_CACHE', 'CON_CLAMPTO', 'CON_KINEMATIC', 'CON_LOCKTRACK', 'CON_SPLINEIK', 'CON_STRETCHTO', 'CON_TRACKTO', 'CON_ARMATURE', 'CON_CHILDOF', 'CON_FLOOR', 'CON_FOLLOWPATH', 'CON_PIVOT', 'CON_SHRINKWRAP', 'MODIFIER_DATA', 'MOD_WAVE', 'MOD_BUILD', 'MOD_DECIM', 'MOD_MIRROR', 'MOD_SOFT', 'MOD_SUBSURF', 'HOOK', 'MOD_PHYSICS', 'MOD_PARTICLES', 'MOD_BOOLEAN', 'MOD_EDGESPLIT', 'MOD_ARRAY', 'MOD_UVPROJECT', 'MOD_DISPLACE', 'MOD_CURVE', 'MOD_LATTICE', 'MOD_TINT', 'MOD_ARMATURE', 'MOD_SHRINKWRAP', 'MOD_CAST', 'MOD_MESHDEFORM', 'MOD_BEVEL', 'MOD_SMOOTH', 'MOD_SIMPLEDEFORM', 'MOD_MASK', 'MOD_CLOTH', 'MOD_EXPLODE', 'MOD_FLUIDSIM', 'MOD_MULTIRES', 'MOD_FLUID', 'MOD_SOLIDIFY', 'MOD_SCREW', 'MOD_VERTEX_WEIGHT', 'MOD_DYNAMICPAINT', 'MOD_REMESH', 'MOD_OCEAN', 'MOD_WARP', 'MOD_SKIN', 'MOD_TRIANGULATE', 'MOD_WIREFRAME', 'MOD_DATA_TRANSFER', 'MOD_NORMALEDIT', 'MOD_PARTICLE_INSTANCE', 'MOD_HUE_SATURATION', 'MOD_NOISE', 'MOD_OFFSET', 'MOD_SIMPLIFY', 'MOD_THICKNESS', 'MOD_INSTANCE', 'MOD_TIME', 'MOD_OPACITY', 'REC', 'PLAY', 'FF', 'REW', 'PAUSE', 'PREV_KEYFRAME', 'NEXT_KEYFRAME', 'PLAY_SOUND', 'PLAY_REVERSE', 'PREVIEW_RANGE', 'ACTION_TWEAK', 'PMARKER_ACT', 'PMARKER_SEL', 'PMARKER', 'MARKER_HLT', 'MARKER', 'KEYFRAME_HLT', 'KEYFRAME', 'KEYINGSET', 'KEY_DEHLT', 'KEY_HLT', 'MUTE_IPO_OFF', 'MUTE_IPO_ON', 'DRIVER', 'SOLO_OFF', 'SOLO_ON', 'FRAME_PREV', 'FRAME_NEXT', 'NLA_PUSHDOWN', 'IPO_CONSTANT', 'IPO_LINEAR', 'IPO_BEZIER', 'IPO_SINE', 'IPO_QUAD', 'IPO_CUBIC', 'IPO_QUART', 'IPO_QUINT', 'IPO_EXPO', 'IPO_CIRC', 'IPO_BOUNCE', 'IPO_ELASTIC', 'IPO_BACK', 'IPO_EASE_IN', 'IPO_EASE_OUT', 'IPO_EASE_IN_OUT', 'NORMALIZE_FCURVES', 'VERTEXSEL', 'EDGESEL', 'FACESEL', 'CURSOR', 'PIVOT_BOUNDBOX', 'PIVOT_CURSOR', 'PIVOT_INDIVIDUAL', 'PIVOT_MEDIAN', 'PIVOT_ACTIVE', 'CENTER_ONLY', 'ROOTCURVE', 'SMOOTHCURVE', 'SPHERECURVE', 'INVERSESQUARECURVE', 'SHARPCURVE', 'LINCURVE', 'NOCURVE', 'RNDCURVE', 'PROP_OFF', 'PROP_ON', 'PROP_CON', 'PROP_PROJECTED', 'PARTICLE_POINT', 'PARTICLE_TIP', 'PARTICLE_PATH', 'SNAP_FACE_CENTER', 'SNAP_PERPENDICULAR', 'SNAP_MIDPOINT', 'SNAP_OFF', 'SNAP_ON', 'SNAP_NORMAL', 'SNAP_GRID', 'SNAP_VERTEX', 'SNAP_EDGE', 'SNAP_FACE', 'SNAP_VOLUME', 'SNAP_INCREMENT', 'STICKY_UVS_LOC', 'STICKY_UVS_DISABLE', 'STICKY_UVS_VERT', 'CLIPUV_DEHLT', 'CLIPUV_HLT', 'SNAP_PEEL_OBJECT', 'GRID', 'OBJECT_ORIGIN', 'ORIENTATION_GLOBAL', 'ORIENTATION_GIMBAL', 'ORIENTATION_LOCAL', 'ORIENTATION_NORMAL', 'ORIENTATION_VIEW', 'COPYDOWN', 'PASTEDOWN', 'PASTEFLIPUP', 'PASTEFLIPDOWN', 'VIS_SEL_11', 'VIS_SEL_10', 'VIS_SEL_01', 'VIS_SEL_00', 'AUTOMERGE_OFF', 'AUTOMERGE_ON', 'UV_VERTEXSEL', 'UV_EDGESEL', 'UV_FACESEL', 'UV_ISLANDSEL', 'UV_SYNC_SELECT', 'TRANSFORM_ORIGINS', 'GIZMO', 'ORIENTATION_CURSOR', 'NORMALS_VERTEX', 'NORMALS_FACE', 'NORMALS_VERTEX_FACE', 'SHADING_BBOX', 'SHADING_WIRE', 'SHADING_SOLID', 'SHADING_RENDERED', 'SHADING_TEXTURE', 'OVERLAY', 'XRAY', 'LOCKVIEW_OFF', 'LOCKVIEW_ON', 'AXIS_SIDE', 'AXIS_FRONT', 'AXIS_TOP', 'LAYER_USED', 'LAYER_ACTIVE', 'HOME', 'DOCUMENTS', 'TEMP', 'SORTALPHA', 'SORTBYEXT', 'SORTTIME', 'SORTSIZE', 'SHORTDISPLAY', 'LONGDISPLAY', 'IMGDISPLAY', 'BOOKMARKS', 'FONTPREVIEW', 'FILTER', 'NEWFOLDER', 'FILE_PARENT', 'FILE_REFRESH', 'FILE_FOLDER', 'FILE_BLANK', 'FILE_BLEND', 'FILE_IMAGE', 'FILE_MOVIE', 'FILE_SCRIPT', 'FILE_SOUND', 'FILE_FONT', 'FILE_TEXT', 'SORT_DESC', 'SORT_ASC', 'LINK_BLEND', 'APPEND_BLEND', 'IMPORT', 'EXPORT', 'LOOP_BACK', 'LOOP_FORWARDS', 'BACK', 'FORWARD', 'FILE_ARCHIVE', 'FILE_CACHE', 'FILE_VOLUME', 'FILE_3D', 'FILE_HIDDEN', 'FILE_BACKUP', 'DISK_DRIVE', 'MATPLANE', 'MATSPHERE', 'MATCUBE', 'MONKEY', 'HAIR', 'ALIASED', 'ANTIALIASED', 'MAT_SPHERE_SKY', 'MATSHADERBALL', 'MATCLOTH', 'MATFLUID', 'WORDWRAP_OFF', 'WORDWRAP_ON', 'SYNTAX_OFF', 'SYNTAX_ON', 'LINENUMBERS_OFF', 'LINENUMBERS_ON', 'SCRIPTPLUGINS', 'DISC', 'DESKTOP', 'EXTERNAL_DRIVE', 'NETWORK_DRIVE', 'SEQ_SEQUENCER', 'SEQ_PREVIEW', 'SEQ_LUMA_WAVEFORM', 'SEQ_CHROMA_SCOPE', 'SEQ_HISTOGRAM', 'SEQ_SPLITVIEW', 'SEQ_STRIP_META', 'SEQ_STRIP_DUPLICATE', 'IMAGE_RGB', 'IMAGE_RGB_ALPHA', 'IMAGE_ALPHA', 'IMAGE_ZDEPTH', 'VIEW_PERSPECTIVE', 'VIEW_ORTHO', 'VIEW_CAMERA', 'VIEW_PAN', 'VIEW_ZOOM', 'BRUSH_BLOB', 'BRUSH_BLUR', 'BRUSH_CLAY', 'BRUSH_CLAY_STRIPS', 'BRUSH_CLONE', 'BRUSH_CREASE', 'BRUSH_FILL', 'BRUSH_FLATTEN', 'BRUSH_GRAB', 'BRUSH_INFLATE', 'BRUSH_LAYER', 'BRUSH_MASK', 'BRUSH_MIX', 'BRUSH_NUDGE', 'BRUSH_PINCH', 'BRUSH_SCRAPE', 'BRUSH_SCULPT_DRAW', 'BRUSH_SMEAR', 'BRUSH_SMOOTH', 'BRUSH_SNAKE_HOOK', 'BRUSH_SOFTEN', 'BRUSH_TEXDRAW', 'BRUSH_TEXFILL', 'BRUSH_TEXMASK', 'BRUSH_THUMB', 'BRUSH_ROTATE', 'GPBRUSH_SMOOTH', 'GPBRUSH_THICKNESS', 'GPBRUSH_STRENGTH', 'GPBRUSH_GRAB', 'GPBRUSH_PUSH', 'GPBRUSH_TWIST', 'GPBRUSH_PINCH', 'GPBRUSH_RANDOMIZE', 'GPBRUSH_CLONE', 'GPBRUSH_WEIGHT', 'GPBRUSH_PENCIL', 'GPBRUSH_PEN', 'GPBRUSH_INK', 'GPBRUSH_INKNOISE', 'GPBRUSH_BLOCK', 'GPBRUSH_MARKER', 'GPBRUSH_FILL', 'GPBRUSH_AIRBRUSH', 'GPBRUSH_CHISEL', 'GPBRUSH_ERASE_SOFT', 'GPBRUSH_ERASE_HARD', 'GPBRUSH_ERASE_STROKE', 'SMALL_TRI_RIGHT_VEC', 'KEYTYPE_KEYFRAME_VEC', 'KEYTYPE_BREAKDOWN_VEC', 'KEYTYPE_EXTREME_VEC', 'KEYTYPE_JITTER_VEC', 'KEYTYPE_MOVING_HOLD_VEC', 'HANDLETYPE_FREE_VEC', 'HANDLETYPE_ALIGNED_VEC', 'HANDLETYPE_VECTOR_VEC', 'HANDLETYPE_AUTO_VEC', 'HANDLETYPE_AUTO_CLAMP_VEC', 'COLORSET_01_VEC', 'COLORSET_02_VEC', 'COLORSET_03_VEC', 'COLORSET_04_VEC', 'COLORSET_05_VEC', 'COLORSET_06_VEC', 'COLORSET_07_VEC', 'COLORSET_08_VEC', 'COLORSET_09_VEC', 'COLORSET_10_VEC', 'COLORSET_11_VEC', 'COLORSET_12_VEC', 'COLORSET_13_VEC', 'COLORSET_14_VEC', 'COLORSET_15_VEC', 'COLORSET_16_VEC', 'COLORSET_17_VEC', 'COLORSET_18_VEC', 'COLORSET_19_VEC', 'COLORSET_20_VEC', 'EVENT_A', 'EVENT_B', 'EVENT_C', 'EVENT_D', 'EVENT_E', 'EVENT_F', 'EVENT_G', 'EVENT_H', 'EVENT_I', 'EVENT_J', 'EVENT_K', 'EVENT_L', 'EVENT_M', 'EVENT_N', 'EVENT_O', 'EVENT_P', 'EVENT_Q', 'EVENT_R', 'EVENT_S', 'EVENT_T', 'EVENT_U', 'EVENT_V', 'EVENT_W', 'EVENT_X', 'EVENT_Y', 'EVENT_Z', 'EVENT_SHIFT', 'EVENT_CTRL', 'EVENT_ALT', 'EVENT_OS', 'EVENT_F1', 'EVENT_F2', 'EVENT_F3', 'EVENT_F4', 'EVENT_F5', 'EVENT_F6', 'EVENT_F7', 'EVENT_F8', 'EVENT_F9', 'EVENT_F10', 'EVENT_F11', 'EVENT_F12', 'EVENT_ESC', 'EVENT_TAB', 'EVENT_PAGEUP', 'EVENT_PAGEDOWN', 'EVENT_RETURN', 'EVENT_SPACEKEY'], default 'NODE'
   */
  public get bl_icon():
    | 'NONE'
    | 'QUESTION'
    | 'ERROR'
    | 'CANCEL'
    | 'TRIA_RIGHT'
    | 'TRIA_DOWN'
    | 'TRIA_LEFT'
    | 'TRIA_UP'
    | 'ARROW_LEFTRIGHT'
    | 'PLUS'
    | 'DISCLOSURE_TRI_RIGHT'
    | 'DISCLOSURE_TRI_DOWN'
    | 'RADIOBUT_OFF'
    | 'RADIOBUT_ON'
    | 'MENU_PANEL'
    | 'BLENDER'
    | 'GRIP'
    | 'DOT'
    | 'COLLAPSEMENU'
    | 'X'
    | 'DUPLICATE'
    | 'TRASH'
    | 'COLLECTION_NEW'
    | 'OPTIONS'
    | 'NODE'
    | 'NODE_SEL'
    | 'WINDOW'
    | 'WORKSPACE'
    | 'RIGHTARROW_THIN'
    | 'BORDERMOVE'
    | 'VIEWZOOM'
    | 'ADD'
    | 'REMOVE'
    | 'PANEL_CLOSE'
    | 'COPY_ID'
    | 'EYEDROPPER'
    | 'CHECKMARK'
    | 'AUTO'
    | 'CHECKBOX_DEHLT'
    | 'CHECKBOX_HLT'
    | 'UNLOCKED'
    | 'LOCKED'
    | 'UNPINNED'
    | 'PINNED'
    | 'SCREEN_BACK'
    | 'RIGHTARROW'
    | 'DOWNARROW_HLT'
    | 'FCURVE_SNAPSHOT'
    | 'OBJECT_HIDDEN'
    | 'TOPBAR'
    | 'STATUSBAR'
    | 'PLUGIN'
    | 'HELP'
    | 'GHOST_ENABLED'
    | 'COLOR'
    | 'UNLINKED'
    | 'LINKED'
    | 'HAND'
    | 'ZOOM_ALL'
    | 'ZOOM_SELECTED'
    | 'ZOOM_PREVIOUS'
    | 'ZOOM_IN'
    | 'ZOOM_OUT'
    | 'DRIVER_DISTANCE'
    | 'DRIVER_ROTATIONAL_DIFFERENCE'
    | 'DRIVER_TRANSFORM'
    | 'FREEZE'
    | 'STYLUS_PRESSURE'
    | 'GHOST_DISABLED'
    | 'FILE_NEW'
    | 'FILE_TICK'
    | 'QUIT'
    | 'URL'
    | 'RECOVER_LAST'
    | 'THREE_DOTS'
    | 'FULLSCREEN_ENTER'
    | 'FULLSCREEN_EXIT'
    | 'LIGHT'
    | 'MATERIAL'
    | 'TEXTURE'
    | 'ANIM'
    | 'WORLD'
    | 'SCENE'
    | 'OUTPUT'
    | 'SCRIPT'
    | 'PARTICLES'
    | 'PHYSICS'
    | 'SPEAKER'
    | 'TOOL_SETTINGS'
    | 'SHADERFX'
    | 'MODIFIER'
    | 'BLANK1'
    | 'FAKE_USER_OFF'
    | 'FAKE_USER_ON'
    | 'VIEW3D'
    | 'GRAPH'
    | 'OUTLINER'
    | 'PROPERTIES'
    | 'FILEBROWSER'
    | 'IMAGE'
    | 'INFO'
    | 'SEQUENCE'
    | 'TEXT'
    | 'SOUND'
    | 'ACTION'
    | 'NLA'
    | 'PREFERENCES'
    | 'TIME'
    | 'NODETREE'
    | 'CONSOLE'
    | 'TRACKER'
    | 'ASSET_MANAGER'
    | 'NODE_COMPOSITING'
    | 'NODE_TEXTURE'
    | 'NODE_MATERIAL'
    | 'UV'
    | 'OBJECT_DATAMODE'
    | 'EDITMODE_HLT'
    | 'UV_DATA'
    | 'VPAINT_HLT'
    | 'TPAINT_HLT'
    | 'WPAINT_HLT'
    | 'SCULPTMODE_HLT'
    | 'POSE_HLT'
    | 'PARTICLEMODE'
    | 'TRACKING'
    | 'TRACKING_BACKWARDS'
    | 'TRACKING_FORWARDS'
    | 'TRACKING_BACKWARDS_SINGLE'
    | 'TRACKING_FORWARDS_SINGLE'
    | 'TRACKING_CLEAR_BACKWARDS'
    | 'TRACKING_CLEAR_FORWARDS'
    | 'TRACKING_REFINE_BACKWARDS'
    | 'TRACKING_REFINE_FORWARDS'
    | 'SCENE_DATA'
    | 'RENDERLAYERS'
    | 'WORLD_DATA'
    | 'OBJECT_DATA'
    | 'MESH_DATA'
    | 'CURVE_DATA'
    | 'META_DATA'
    | 'LATTICE_DATA'
    | 'LIGHT_DATA'
    | 'MATERIAL_DATA'
    | 'TEXTURE_DATA'
    | 'ANIM_DATA'
    | 'CAMERA_DATA'
    | 'PARTICLE_DATA'
    | 'LIBRARY_DATA_DIRECT'
    | 'GROUP'
    | 'ARMATURE_DATA'
    | 'COMMUNITY'
    | 'BONE_DATA'
    | 'CONSTRAINT'
    | 'SHAPEKEY_DATA'
    | 'CONSTRAINT_BONE'
    | 'CAMERA_STEREO'
    | 'PACKAGE'
    | 'UGLYPACKAGE'
    | 'EXPERIMENTAL'
    | 'BRUSH_DATA'
    | 'IMAGE_DATA'
    | 'FILE'
    | 'FCURVE'
    | 'FONT_DATA'
    | 'RENDER_RESULT'
    | 'SURFACE_DATA'
    | 'EMPTY_DATA'
    | 'PRESET'
    | 'RENDER_ANIMATION'
    | 'RENDER_STILL'
    | 'LIBRARY_DATA_BROKEN'
    | 'BOIDS'
    | 'STRANDS'
    | 'LIBRARY_DATA_INDIRECT'
    | 'GREASEPENCIL'
    | 'LINE_DATA'
    | 'LIBRARY_DATA_OVERRIDE'
    | 'GROUP_BONE'
    | 'GROUP_VERTEX'
    | 'GROUP_VCOL'
    | 'GROUP_UVS'
    | 'FACE_MAPS'
    | 'RNA'
    | 'RNA_ADD'
    | 'MOUSE_LMB'
    | 'MOUSE_MMB'
    | 'MOUSE_RMB'
    | 'MOUSE_MOVE'
    | 'MOUSE_LMB_DRAG'
    | 'MOUSE_MMB_DRAG'
    | 'MOUSE_RMB_DRAG'
    | 'MEMORY'
    | 'PRESET_NEW'
    | 'DECORATE'
    | 'DECORATE_KEYFRAME'
    | 'DECORATE_ANIMATE'
    | 'DECORATE_DRIVER'
    | 'DECORATE_LINKED'
    | 'DECORATE_LIBRARY_OVERRIDE'
    | 'DECORATE_UNLOCKED'
    | 'DECORATE_LOCKED'
    | 'DECORATE_OVERRIDE'
    | 'FUND'
    | 'TRACKER_DATA'
    | 'HEART'
    | 'ORPHAN_DATA'
    | 'USER'
    | 'SYSTEM'
    | 'SETTINGS'
    | 'OUTLINER_OB_EMPTY'
    | 'OUTLINER_OB_MESH'
    | 'OUTLINER_OB_CURVE'
    | 'OUTLINER_OB_LATTICE'
    | 'OUTLINER_OB_META'
    | 'OUTLINER_OB_LIGHT'
    | 'OUTLINER_OB_CAMERA'
    | 'OUTLINER_OB_ARMATURE'
    | 'OUTLINER_OB_FONT'
    | 'OUTLINER_OB_SURFACE'
    | 'OUTLINER_OB_SPEAKER'
    | 'OUTLINER_OB_FORCE_FIELD'
    | 'OUTLINER_OB_GROUP_INSTANCE'
    | 'OUTLINER_OB_GREASEPENCIL'
    | 'OUTLINER_OB_LIGHTPROBE'
    | 'OUTLINER_OB_IMAGE'
    | 'RESTRICT_COLOR_OFF'
    | 'RESTRICT_COLOR_ON'
    | 'HIDE_ON'
    | 'HIDE_OFF'
    | 'RESTRICT_SELECT_ON'
    | 'RESTRICT_SELECT_OFF'
    | 'RESTRICT_RENDER_ON'
    | 'RESTRICT_RENDER_OFF'
    | 'RESTRICT_INSTANCED_OFF'
    | 'OUTLINER_DATA_EMPTY'
    | 'OUTLINER_DATA_MESH'
    | 'OUTLINER_DATA_CURVE'
    | 'OUTLINER_DATA_LATTICE'
    | 'OUTLINER_DATA_META'
    | 'OUTLINER_DATA_LIGHT'
    | 'OUTLINER_DATA_CAMERA'
    | 'OUTLINER_DATA_ARMATURE'
    | 'OUTLINER_DATA_FONT'
    | 'OUTLINER_DATA_SURFACE'
    | 'OUTLINER_DATA_SPEAKER'
    | 'OUTLINER_DATA_LIGHTPROBE'
    | 'OUTLINER_DATA_GP_LAYER'
    | 'OUTLINER_DATA_GREASEPENCIL'
    | 'GP_SELECT_POINTS'
    | 'GP_SELECT_STROKES'
    | 'GP_MULTIFRAME_EDITING'
    | 'GP_ONLY_SELECTED'
    | 'GP_SELECT_BETWEEN_STROKES'
    | 'MODIFIER_OFF'
    | 'MODIFIER_ON'
    | 'ONIONSKIN_OFF'
    | 'ONIONSKIN_ON'
    | 'RESTRICT_VIEW_ON'
    | 'RESTRICT_VIEW_OFF'
    | 'RESTRICT_INSTANCED_ON'
    | 'MESH_PLANE'
    | 'MESH_CUBE'
    | 'MESH_CIRCLE'
    | 'MESH_UVSPHERE'
    | 'MESH_ICOSPHERE'
    | 'MESH_GRID'
    | 'MESH_MONKEY'
    | 'MESH_CYLINDER'
    | 'MESH_TORUS'
    | 'MESH_CONE'
    | 'MESH_CAPSULE'
    | 'EMPTY_SINGLE_ARROW'
    | 'LIGHT_POINT'
    | 'LIGHT_SUN'
    | 'LIGHT_SPOT'
    | 'LIGHT_HEMI'
    | 'LIGHT_AREA'
    | 'CUBE'
    | 'SPHERE'
    | 'CONE'
    | 'META_PLANE'
    | 'META_CUBE'
    | 'META_BALL'
    | 'META_ELLIPSOID'
    | 'META_CAPSULE'
    | 'SURFACE_NCURVE'
    | 'SURFACE_NCIRCLE'
    | 'SURFACE_NSURFACE'
    | 'SURFACE_NCYLINDER'
    | 'SURFACE_NSPHERE'
    | 'SURFACE_NTORUS'
    | 'EMPTY_AXIS'
    | 'STROKE'
    | 'EMPTY_ARROWS'
    | 'CURVE_BEZCURVE'
    | 'CURVE_BEZCIRCLE'
    | 'CURVE_NCURVE'
    | 'CURVE_NCIRCLE'
    | 'CURVE_PATH'
    | 'LIGHTPROBE_CUBEMAP'
    | 'LIGHTPROBE_PLANAR'
    | 'LIGHTPROBE_GRID'
    | 'COLOR_RED'
    | 'COLOR_GREEN'
    | 'COLOR_BLUE'
    | 'TRIA_RIGHT_BAR'
    | 'TRIA_DOWN_BAR'
    | 'TRIA_LEFT_BAR'
    | 'TRIA_UP_BAR'
    | 'FORCE_FORCE'
    | 'FORCE_WIND'
    | 'FORCE_VORTEX'
    | 'FORCE_MAGNETIC'
    | 'FORCE_HARMONIC'
    | 'FORCE_CHARGE'
    | 'FORCE_LENNARDJONES'
    | 'FORCE_TEXTURE'
    | 'FORCE_CURVE'
    | 'FORCE_BOID'
    | 'FORCE_TURBULENCE'
    | 'FORCE_DRAG'
    | 'FORCE_SMOKEFLOW'
    | 'RIGID_BODY'
    | 'RIGID_BODY_CONSTRAINT'
    | 'IMAGE_PLANE'
    | 'IMAGE_BACKGROUND'
    | 'IMAGE_REFERENCE'
    | 'NODE_INSERT_ON'
    | 'NODE_INSERT_OFF'
    | 'NODE_TOP'
    | 'NODE_SIDE'
    | 'NODE_CORNER'
    | 'SELECT_SET'
    | 'SELECT_EXTEND'
    | 'SELECT_SUBTRACT'
    | 'SELECT_INTERSECT'
    | 'SELECT_DIFFERENCE'
    | 'ALIGN_LEFT'
    | 'ALIGN_CENTER'
    | 'ALIGN_RIGHT'
    | 'ALIGN_JUSTIFY'
    | 'ALIGN_FLUSH'
    | 'ALIGN_TOP'
    | 'ALIGN_MIDDLE'
    | 'ALIGN_BOTTOM'
    | 'BOLD'
    | 'ITALIC'
    | 'UNDERLINE'
    | 'SMALL_CAPS'
    | 'CON_ACTION'
    | 'HOLDOUT_OFF'
    | 'HOLDOUT_ON'
    | 'INDIRECT_ONLY_OFF'
    | 'INDIRECT_ONLY_ON'
    | 'CON_CAMERASOLVER'
    | 'CON_FOLLOWTRACK'
    | 'CON_OBJECTSOLVER'
    | 'CON_LOCLIKE'
    | 'CON_ROTLIKE'
    | 'CON_SIZELIKE'
    | 'CON_TRANSLIKE'
    | 'CON_DISTLIMIT'
    | 'CON_LOCLIMIT'
    | 'CON_ROTLIMIT'
    | 'CON_SIZELIMIT'
    | 'CON_SAMEVOL'
    | 'CON_TRANSFORM'
    | 'CON_TRANSFORM_CACHE'
    | 'CON_CLAMPTO'
    | 'CON_KINEMATIC'
    | 'CON_LOCKTRACK'
    | 'CON_SPLINEIK'
    | 'CON_STRETCHTO'
    | 'CON_TRACKTO'
    | 'CON_ARMATURE'
    | 'CON_CHILDOF'
    | 'CON_FLOOR'
    | 'CON_FOLLOWPATH'
    | 'CON_PIVOT'
    | 'CON_SHRINKWRAP'
    | 'MODIFIER_DATA'
    | 'MOD_WAVE'
    | 'MOD_BUILD'
    | 'MOD_DECIM'
    | 'MOD_MIRROR'
    | 'MOD_SOFT'
    | 'MOD_SUBSURF'
    | 'HOOK'
    | 'MOD_PHYSICS'
    | 'MOD_PARTICLES'
    | 'MOD_BOOLEAN'
    | 'MOD_EDGESPLIT'
    | 'MOD_ARRAY'
    | 'MOD_UVPROJECT'
    | 'MOD_DISPLACE'
    | 'MOD_CURVE'
    | 'MOD_LATTICE'
    | 'MOD_TINT'
    | 'MOD_ARMATURE'
    | 'MOD_SHRINKWRAP'
    | 'MOD_CAST'
    | 'MOD_MESHDEFORM'
    | 'MOD_BEVEL'
    | 'MOD_SMOOTH'
    | 'MOD_SIMPLEDEFORM'
    | 'MOD_MASK'
    | 'MOD_CLOTH'
    | 'MOD_EXPLODE'
    | 'MOD_FLUIDSIM'
    | 'MOD_MULTIRES'
    | 'MOD_FLUID'
    | 'MOD_SOLIDIFY'
    | 'MOD_SCREW'
    | 'MOD_VERTEX_WEIGHT'
    | 'MOD_DYNAMICPAINT'
    | 'MOD_REMESH'
    | 'MOD_OCEAN'
    | 'MOD_WARP'
    | 'MOD_SKIN'
    | 'MOD_TRIANGULATE'
    | 'MOD_WIREFRAME'
    | 'MOD_DATA_TRANSFER'
    | 'MOD_NORMALEDIT'
    | 'MOD_PARTICLE_INSTANCE'
    | 'MOD_HUE_SATURATION'
    | 'MOD_NOISE'
    | 'MOD_OFFSET'
    | 'MOD_SIMPLIFY'
    | 'MOD_THICKNESS'
    | 'MOD_INSTANCE'
    | 'MOD_TIME'
    | 'MOD_OPACITY'
    | 'REC'
    | 'PLAY'
    | 'FF'
    | 'REW'
    | 'PAUSE'
    | 'PREV_KEYFRAME'
    | 'NEXT_KEYFRAME'
    | 'PLAY_SOUND'
    | 'PLAY_REVERSE'
    | 'PREVIEW_RANGE'
    | 'ACTION_TWEAK'
    | 'PMARKER_ACT'
    | 'PMARKER_SEL'
    | 'PMARKER'
    | 'MARKER_HLT'
    | 'MARKER'
    | 'KEYFRAME_HLT'
    | 'KEYFRAME'
    | 'KEYINGSET'
    | 'KEY_DEHLT'
    | 'KEY_HLT'
    | 'MUTE_IPO_OFF'
    | 'MUTE_IPO_ON'
    | 'DRIVER'
    | 'SOLO_OFF'
    | 'SOLO_ON'
    | 'FRAME_PREV'
    | 'FRAME_NEXT'
    | 'NLA_PUSHDOWN'
    | 'IPO_CONSTANT'
    | 'IPO_LINEAR'
    | 'IPO_BEZIER'
    | 'IPO_SINE'
    | 'IPO_QUAD'
    | 'IPO_CUBIC'
    | 'IPO_QUART'
    | 'IPO_QUINT'
    | 'IPO_EXPO'
    | 'IPO_CIRC'
    | 'IPO_BOUNCE'
    | 'IPO_ELASTIC'
    | 'IPO_BACK'
    | 'IPO_EASE_IN'
    | 'IPO_EASE_OUT'
    | 'IPO_EASE_IN_OUT'
    | 'NORMALIZE_FCURVES'
    | 'VERTEXSEL'
    | 'EDGESEL'
    | 'FACESEL'
    | 'CURSOR'
    | 'PIVOT_BOUNDBOX'
    | 'PIVOT_CURSOR'
    | 'PIVOT_INDIVIDUAL'
    | 'PIVOT_MEDIAN'
    | 'PIVOT_ACTIVE'
    | 'CENTER_ONLY'
    | 'ROOTCURVE'
    | 'SMOOTHCURVE'
    | 'SPHERECURVE'
    | 'INVERSESQUARECURVE'
    | 'SHARPCURVE'
    | 'LINCURVE'
    | 'NOCURVE'
    | 'RNDCURVE'
    | 'PROP_OFF'
    | 'PROP_ON'
    | 'PROP_CON'
    | 'PROP_PROJECTED'
    | 'PARTICLE_POINT'
    | 'PARTICLE_TIP'
    | 'PARTICLE_PATH'
    | 'SNAP_FACE_CENTER'
    | 'SNAP_PERPENDICULAR'
    | 'SNAP_MIDPOINT'
    | 'SNAP_OFF'
    | 'SNAP_ON'
    | 'SNAP_NORMAL'
    | 'SNAP_GRID'
    | 'SNAP_VERTEX'
    | 'SNAP_EDGE'
    | 'SNAP_FACE'
    | 'SNAP_VOLUME'
    | 'SNAP_INCREMENT'
    | 'STICKY_UVS_LOC'
    | 'STICKY_UVS_DISABLE'
    | 'STICKY_UVS_VERT'
    | 'CLIPUV_DEHLT'
    | 'CLIPUV_HLT'
    | 'SNAP_PEEL_OBJECT'
    | 'GRID'
    | 'OBJECT_ORIGIN'
    | 'ORIENTATION_GLOBAL'
    | 'ORIENTATION_GIMBAL'
    | 'ORIENTATION_LOCAL'
    | 'ORIENTATION_NORMAL'
    | 'ORIENTATION_VIEW'
    | 'COPYDOWN'
    | 'PASTEDOWN'
    | 'PASTEFLIPUP'
    | 'PASTEFLIPDOWN'
    | 'VIS_SEL_11'
    | 'VIS_SEL_10'
    | 'VIS_SEL_01'
    | 'VIS_SEL_00'
    | 'AUTOMERGE_OFF'
    | 'AUTOMERGE_ON'
    | 'UV_VERTEXSEL'
    | 'UV_EDGESEL'
    | 'UV_FACESEL'
    | 'UV_ISLANDSEL'
    | 'UV_SYNC_SELECT'
    | 'TRANSFORM_ORIGINS'
    | 'GIZMO'
    | 'ORIENTATION_CURSOR'
    | 'NORMALS_VERTEX'
    | 'NORMALS_FACE'
    | 'NORMALS_VERTEX_FACE'
    | 'SHADING_BBOX'
    | 'SHADING_WIRE'
    | 'SHADING_SOLID'
    | 'SHADING_RENDERED'
    | 'SHADING_TEXTURE'
    | 'OVERLAY'
    | 'XRAY'
    | 'LOCKVIEW_OFF'
    | 'LOCKVIEW_ON'
    | 'AXIS_SIDE'
    | 'AXIS_FRONT'
    | 'AXIS_TOP'
    | 'LAYER_USED'
    | 'LAYER_ACTIVE'
    | 'HOME'
    | 'DOCUMENTS'
    | 'TEMP'
    | 'SORTALPHA'
    | 'SORTBYEXT'
    | 'SORTTIME'
    | 'SORTSIZE'
    | 'SHORTDISPLAY'
    | 'LONGDISPLAY'
    | 'IMGDISPLAY'
    | 'BOOKMARKS'
    | 'FONTPREVIEW'
    | 'FILTER'
    | 'NEWFOLDER'
    | 'FILE_PARENT'
    | 'FILE_REFRESH'
    | 'FILE_FOLDER'
    | 'FILE_BLANK'
    | 'FILE_BLEND'
    | 'FILE_IMAGE'
    | 'FILE_MOVIE'
    | 'FILE_SCRIPT'
    | 'FILE_SOUND'
    | 'FILE_FONT'
    | 'FILE_TEXT'
    | 'SORT_DESC'
    | 'SORT_ASC'
    | 'LINK_BLEND'
    | 'APPEND_BLEND'
    | 'IMPORT'
    | 'EXPORT'
    | 'LOOP_BACK'
    | 'LOOP_FORWARDS'
    | 'BACK'
    | 'FORWARD'
    | 'FILE_ARCHIVE'
    | 'FILE_CACHE'
    | 'FILE_VOLUME'
    | 'FILE_3D'
    | 'FILE_HIDDEN'
    | 'FILE_BACKUP'
    | 'DISK_DRIVE'
    | 'MATPLANE'
    | 'MATSPHERE'
    | 'MATCUBE'
    | 'MONKEY'
    | 'HAIR'
    | 'ALIASED'
    | 'ANTIALIASED'
    | 'MAT_SPHERE_SKY'
    | 'MATSHADERBALL'
    | 'MATCLOTH'
    | 'MATFLUID'
    | 'WORDWRAP_OFF'
    | 'WORDWRAP_ON'
    | 'SYNTAX_OFF'
    | 'SYNTAX_ON'
    | 'LINENUMBERS_OFF'
    | 'LINENUMBERS_ON'
    | 'SCRIPTPLUGINS'
    | 'DISC'
    | 'DESKTOP'
    | 'EXTERNAL_DRIVE'
    | 'NETWORK_DRIVE'
    | 'SEQ_SEQUENCER'
    | 'SEQ_PREVIEW'
    | 'SEQ_LUMA_WAVEFORM'
    | 'SEQ_CHROMA_SCOPE'
    | 'SEQ_HISTOGRAM'
    | 'SEQ_SPLITVIEW'
    | 'SEQ_STRIP_META'
    | 'SEQ_STRIP_DUPLICATE'
    | 'IMAGE_RGB'
    | 'IMAGE_RGB_ALPHA'
    | 'IMAGE_ALPHA'
    | 'IMAGE_ZDEPTH'
    | 'VIEW_PERSPECTIVE'
    | 'VIEW_ORTHO'
    | 'VIEW_CAMERA'
    | 'VIEW_PAN'
    | 'VIEW_ZOOM'
    | 'BRUSH_BLOB'
    | 'BRUSH_BLUR'
    | 'BRUSH_CLAY'
    | 'BRUSH_CLAY_STRIPS'
    | 'BRUSH_CLONE'
    | 'BRUSH_CREASE'
    | 'BRUSH_FILL'
    | 'BRUSH_FLATTEN'
    | 'BRUSH_GRAB'
    | 'BRUSH_INFLATE'
    | 'BRUSH_LAYER'
    | 'BRUSH_MASK'
    | 'BRUSH_MIX'
    | 'BRUSH_NUDGE'
    | 'BRUSH_PINCH'
    | 'BRUSH_SCRAPE'
    | 'BRUSH_SCULPT_DRAW'
    | 'BRUSH_SMEAR'
    | 'BRUSH_SMOOTH'
    | 'BRUSH_SNAKE_HOOK'
    | 'BRUSH_SOFTEN'
    | 'BRUSH_TEXDRAW'
    | 'BRUSH_TEXFILL'
    | 'BRUSH_TEXMASK'
    | 'BRUSH_THUMB'
    | 'BRUSH_ROTATE'
    | 'GPBRUSH_SMOOTH'
    | 'GPBRUSH_THICKNESS'
    | 'GPBRUSH_STRENGTH'
    | 'GPBRUSH_GRAB'
    | 'GPBRUSH_PUSH'
    | 'GPBRUSH_TWIST'
    | 'GPBRUSH_PINCH'
    | 'GPBRUSH_RANDOMIZE'
    | 'GPBRUSH_CLONE'
    | 'GPBRUSH_WEIGHT'
    | 'GPBRUSH_PENCIL'
    | 'GPBRUSH_PEN'
    | 'GPBRUSH_INK'
    | 'GPBRUSH_INKNOISE'
    | 'GPBRUSH_BLOCK'
    | 'GPBRUSH_MARKER'
    | 'GPBRUSH_FILL'
    | 'GPBRUSH_AIRBRUSH'
    | 'GPBRUSH_CHISEL'
    | 'GPBRUSH_ERASE_SOFT'
    | 'GPBRUSH_ERASE_HARD'
    | 'GPBRUSH_ERASE_STROKE'
    | 'SMALL_TRI_RIGHT_VEC'
    | 'KEYTYPE_KEYFRAME_VEC'
    | 'KEYTYPE_BREAKDOWN_VEC'
    | 'KEYTYPE_EXTREME_VEC'
    | 'KEYTYPE_JITTER_VEC'
    | 'KEYTYPE_MOVING_HOLD_VEC'
    | 'HANDLETYPE_FREE_VEC'
    | 'HANDLETYPE_ALIGNED_VEC'
    | 'HANDLETYPE_VECTOR_VEC'
    | 'HANDLETYPE_AUTO_VEC'
    | 'HANDLETYPE_AUTO_CLAMP_VEC'
    | 'COLORSET_01_VEC'
    | 'COLORSET_02_VEC'
    | 'COLORSET_03_VEC'
    | 'COLORSET_04_VEC'
    | 'COLORSET_05_VEC'
    | 'COLORSET_06_VEC'
    | 'COLORSET_07_VEC'
    | 'COLORSET_08_VEC'
    | 'COLORSET_09_VEC'
    | 'COLORSET_10_VEC'
    | 'COLORSET_11_VEC'
    | 'COLORSET_12_VEC'
    | 'COLORSET_13_VEC'
    | 'COLORSET_14_VEC'
    | 'COLORSET_15_VEC'
    | 'COLORSET_16_VEC'
    | 'COLORSET_17_VEC'
    | 'COLORSET_18_VEC'
    | 'COLORSET_19_VEC'
    | 'COLORSET_20_VEC'
    | 'EVENT_A'
    | 'EVENT_B'
    | 'EVENT_C'
    | 'EVENT_D'
    | 'EVENT_E'
    | 'EVENT_F'
    | 'EVENT_G'
    | 'EVENT_H'
    | 'EVENT_I'
    | 'EVENT_J'
    | 'EVENT_K'
    | 'EVENT_L'
    | 'EVENT_M'
    | 'EVENT_N'
    | 'EVENT_O'
    | 'EVENT_P'
    | 'EVENT_Q'
    | 'EVENT_R'
    | 'EVENT_S'
    | 'EVENT_T'
    | 'EVENT_U'
    | 'EVENT_V'
    | 'EVENT_W'
    | 'EVENT_X'
    | 'EVENT_Y'
    | 'EVENT_Z'
    | 'EVENT_SHIFT'
    | 'EVENT_CTRL'
    | 'EVENT_ALT'
    | 'EVENT_OS'
    | 'EVENT_F1'
    | 'EVENT_F2'
    | 'EVENT_F3'
    | 'EVENT_F4'
    | 'EVENT_F5'
    | 'EVENT_F6'
    | 'EVENT_F7'
    | 'EVENT_F8'
    | 'EVENT_F9'
    | 'EVENT_F10'
    | 'EVENT_F11'
    | 'EVENT_F12'
    | 'EVENT_ESC'
    | 'EVENT_TAB'
    | 'EVENT_PAGEUP'
    | 'EVENT_PAGEDOWN'
    | 'EVENT_RETURN'
    | 'EVENT_SPACEKEY' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.bl_icon`)
  }

  /**
   *
   * @desc string, default '', (never None)
   */
  public get bl_idname(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.bl_idname`)
  }

  /**
   * The node label
   * @desc string, default '', (never None)
   */
  public get bl_label(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.bl_label`)
  }

  /**
   * Node type (deprecated, use with care)
   * @desc enum in ['CUSTOM'], default 'CUSTOM'
   */
  public get bl_static_type(): 'CUSTOM' {
    return PythonInterop.getEnum(this.interop, `${this.accessor}.bl_static_type`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_width_default(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_width_default`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_width_max(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_width_max`)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public get bl_width_min(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.bl_width_min`)
  }

  /**
   * Custom color of the node body
   * @desc float array of 3 items in [0, 1], default (0.0, 0.0, 0.0)
   */
  public get color(): [number, number, number] {
    return PythonInterop.getArray(this.interop, `${this.accessor}.color`, 'number', 3)
  }

  /**
   * Height of the node
   * @desc float in [-inf, inf], default 0.0
   */
  public get height(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.height`)
  }

  /**
   *
   * @desc boolean, default False
   */
  public get hide(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.hide`)
  }

  /**
   * Optional custom node label
   * @desc string, default '', (never None)
   */
  public get label(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.label`)
  }

  /**
   *
   * @desc float array of 2 items in [-100000, 100000], default (0.0, 0.0)
   */
  public get location(): [number, number] {
    return PythonInterop.getArray(this.interop, `${this.accessor}.location`, 'number', 2)
  }

  /**
   *
   * @desc boolean, default False
   */
  public get mute(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.mute`)
  }

  /**
   * Unique node identifier
   * @desc string, default '', (never None)
   */
  public get name(): string {
    return PythonInterop.getString(this.interop, `${this.accessor}.name`)
  }

  /**
   * Parent this node is attached to
   * @desc Node
   */
  public get parent(): Node {
    return PythonInterop.getClass(this.interop, `${this.accessor}.parent`, Node)
  }

  /**
   * Node selection state
   * @desc boolean, default False
   */
  public get select(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.select`)
  }

  /**
   *
   * @desc boolean, default False
   */
  public get show_options(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.show_options`)
  }

  /**
   *
   * @desc boolean, default False
   */
  public get show_preview(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.show_preview`)
  }

  /**
   * Draw node in viewport textured draw mode
   * @desc boolean, default False
   */
  public get show_texture(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.show_texture`)
  }

  /**
   * Use custom color for the node
   * @desc boolean, default False
   */
  public get use_custom_color(): boolean {
    return PythonInterop.getBoolean(this.interop, `${this.accessor}.use_custom_color`)
  }

  /**
   * Width of the node
   * @desc float in [-inf, inf], default 0.0
   */
  public get width(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.width`)
  }

  /**
   * Width of the node in hidden state
   * @desc float in [-inf, inf], default 0.0
   */
  public get width_hidden(): number {
    return PythonInterop.getFloat(this.interop, `${this.accessor}.width_hidden`)
  }

  /**
   *
   * @desc string, default '', (never None)
   */
  public set bl_description(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.bl_description`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_height_default(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_height_default`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_height_max(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_height_max`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_height_min(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_height_min`, value)
  }

  /**
   * The node icon
   * @desc enum in ['NONE', 'QUESTION', 'ERROR', 'CANCEL', 'TRIA_RIGHT', 'TRIA_DOWN', 'TRIA_LEFT', 'TRIA_UP', 'ARROW_LEFTRIGHT', 'PLUS', 'DISCLOSURE_TRI_RIGHT', 'DISCLOSURE_TRI_DOWN', 'RADIOBUT_OFF', 'RADIOBUT_ON', 'MENU_PANEL', 'BLENDER', 'GRIP', 'DOT', 'COLLAPSEMENU', 'X', 'DUPLICATE', 'TRASH', 'COLLECTION_NEW', 'OPTIONS', 'NODE', 'NODE_SEL', 'WINDOW', 'WORKSPACE', 'RIGHTARROW_THIN', 'BORDERMOVE', 'VIEWZOOM', 'ADD', 'REMOVE', 'PANEL_CLOSE', 'COPY_ID', 'EYEDROPPER', 'CHECKMARK', 'AUTO', 'CHECKBOX_DEHLT', 'CHECKBOX_HLT', 'UNLOCKED', 'LOCKED', 'UNPINNED', 'PINNED', 'SCREEN_BACK', 'RIGHTARROW', 'DOWNARROW_HLT', 'FCURVE_SNAPSHOT', 'OBJECT_HIDDEN', 'TOPBAR', 'STATUSBAR', 'PLUGIN', 'HELP', 'GHOST_ENABLED', 'COLOR', 'UNLINKED', 'LINKED', 'HAND', 'ZOOM_ALL', 'ZOOM_SELECTED', 'ZOOM_PREVIOUS', 'ZOOM_IN', 'ZOOM_OUT', 'DRIVER_DISTANCE', 'DRIVER_ROTATIONAL_DIFFERENCE', 'DRIVER_TRANSFORM', 'FREEZE', 'STYLUS_PRESSURE', 'GHOST_DISABLED', 'FILE_NEW', 'FILE_TICK', 'QUIT', 'URL', 'RECOVER_LAST', 'THREE_DOTS', 'FULLSCREEN_ENTER', 'FULLSCREEN_EXIT', 'LIGHT', 'MATERIAL', 'TEXTURE', 'ANIM', 'WORLD', 'SCENE', 'OUTPUT', 'SCRIPT', 'PARTICLES', 'PHYSICS', 'SPEAKER', 'TOOL_SETTINGS', 'SHADERFX', 'MODIFIER', 'BLANK1', 'FAKE_USER_OFF', 'FAKE_USER_ON', 'VIEW3D', 'GRAPH', 'OUTLINER', 'PROPERTIES', 'FILEBROWSER', 'IMAGE', 'INFO', 'SEQUENCE', 'TEXT', 'SOUND', 'ACTION', 'NLA', 'PREFERENCES', 'TIME', 'NODETREE', 'CONSOLE', 'TRACKER', 'ASSET_MANAGER', 'NODE_COMPOSITING', 'NODE_TEXTURE', 'NODE_MATERIAL', 'UV', 'OBJECT_DATAMODE', 'EDITMODE_HLT', 'UV_DATA', 'VPAINT_HLT', 'TPAINT_HLT', 'WPAINT_HLT', 'SCULPTMODE_HLT', 'POSE_HLT', 'PARTICLEMODE', 'TRACKING', 'TRACKING_BACKWARDS', 'TRACKING_FORWARDS', 'TRACKING_BACKWARDS_SINGLE', 'TRACKING_FORWARDS_SINGLE', 'TRACKING_CLEAR_BACKWARDS', 'TRACKING_CLEAR_FORWARDS', 'TRACKING_REFINE_BACKWARDS', 'TRACKING_REFINE_FORWARDS', 'SCENE_DATA', 'RENDERLAYERS', 'WORLD_DATA', 'OBJECT_DATA', 'MESH_DATA', 'CURVE_DATA', 'META_DATA', 'LATTICE_DATA', 'LIGHT_DATA', 'MATERIAL_DATA', 'TEXTURE_DATA', 'ANIM_DATA', 'CAMERA_DATA', 'PARTICLE_DATA', 'LIBRARY_DATA_DIRECT', 'GROUP', 'ARMATURE_DATA', 'COMMUNITY', 'BONE_DATA', 'CONSTRAINT', 'SHAPEKEY_DATA', 'CONSTRAINT_BONE', 'CAMERA_STEREO', 'PACKAGE', 'UGLYPACKAGE', 'EXPERIMENTAL', 'BRUSH_DATA', 'IMAGE_DATA', 'FILE', 'FCURVE', 'FONT_DATA', 'RENDER_RESULT', 'SURFACE_DATA', 'EMPTY_DATA', 'PRESET', 'RENDER_ANIMATION', 'RENDER_STILL', 'LIBRARY_DATA_BROKEN', 'BOIDS', 'STRANDS', 'LIBRARY_DATA_INDIRECT', 'GREASEPENCIL', 'LINE_DATA', 'LIBRARY_DATA_OVERRIDE', 'GROUP_BONE', 'GROUP_VERTEX', 'GROUP_VCOL', 'GROUP_UVS', 'FACE_MAPS', 'RNA', 'RNA_ADD', 'MOUSE_LMB', 'MOUSE_MMB', 'MOUSE_RMB', 'MOUSE_MOVE', 'MOUSE_LMB_DRAG', 'MOUSE_MMB_DRAG', 'MOUSE_RMB_DRAG', 'MEMORY', 'PRESET_NEW', 'DECORATE', 'DECORATE_KEYFRAME', 'DECORATE_ANIMATE', 'DECORATE_DRIVER', 'DECORATE_LINKED', 'DECORATE_LIBRARY_OVERRIDE', 'DECORATE_UNLOCKED', 'DECORATE_LOCKED', 'DECORATE_OVERRIDE', 'FUND', 'TRACKER_DATA', 'HEART', 'ORPHAN_DATA', 'USER', 'SYSTEM', 'SETTINGS', 'OUTLINER_OB_EMPTY', 'OUTLINER_OB_MESH', 'OUTLINER_OB_CURVE', 'OUTLINER_OB_LATTICE', 'OUTLINER_OB_META', 'OUTLINER_OB_LIGHT', 'OUTLINER_OB_CAMERA', 'OUTLINER_OB_ARMATURE', 'OUTLINER_OB_FONT', 'OUTLINER_OB_SURFACE', 'OUTLINER_OB_SPEAKER', 'OUTLINER_OB_FORCE_FIELD', 'OUTLINER_OB_GROUP_INSTANCE', 'OUTLINER_OB_GREASEPENCIL', 'OUTLINER_OB_LIGHTPROBE', 'OUTLINER_OB_IMAGE', 'RESTRICT_COLOR_OFF', 'RESTRICT_COLOR_ON', 'HIDE_ON', 'HIDE_OFF', 'RESTRICT_SELECT_ON', 'RESTRICT_SELECT_OFF', 'RESTRICT_RENDER_ON', 'RESTRICT_RENDER_OFF', 'RESTRICT_INSTANCED_OFF', 'OUTLINER_DATA_EMPTY', 'OUTLINER_DATA_MESH', 'OUTLINER_DATA_CURVE', 'OUTLINER_DATA_LATTICE', 'OUTLINER_DATA_META', 'OUTLINER_DATA_LIGHT', 'OUTLINER_DATA_CAMERA', 'OUTLINER_DATA_ARMATURE', 'OUTLINER_DATA_FONT', 'OUTLINER_DATA_SURFACE', 'OUTLINER_DATA_SPEAKER', 'OUTLINER_DATA_LIGHTPROBE', 'OUTLINER_DATA_GP_LAYER', 'OUTLINER_DATA_GREASEPENCIL', 'GP_SELECT_POINTS', 'GP_SELECT_STROKES', 'GP_MULTIFRAME_EDITING', 'GP_ONLY_SELECTED', 'GP_SELECT_BETWEEN_STROKES', 'MODIFIER_OFF', 'MODIFIER_ON', 'ONIONSKIN_OFF', 'ONIONSKIN_ON', 'RESTRICT_VIEW_ON', 'RESTRICT_VIEW_OFF', 'RESTRICT_INSTANCED_ON', 'MESH_PLANE', 'MESH_CUBE', 'MESH_CIRCLE', 'MESH_UVSPHERE', 'MESH_ICOSPHERE', 'MESH_GRID', 'MESH_MONKEY', 'MESH_CYLINDER', 'MESH_TORUS', 'MESH_CONE', 'MESH_CAPSULE', 'EMPTY_SINGLE_ARROW', 'LIGHT_POINT', 'LIGHT_SUN', 'LIGHT_SPOT', 'LIGHT_HEMI', 'LIGHT_AREA', 'CUBE', 'SPHERE', 'CONE', 'META_PLANE', 'META_CUBE', 'META_BALL', 'META_ELLIPSOID', 'META_CAPSULE', 'SURFACE_NCURVE', 'SURFACE_NCIRCLE', 'SURFACE_NSURFACE', 'SURFACE_NCYLINDER', 'SURFACE_NSPHERE', 'SURFACE_NTORUS', 'EMPTY_AXIS', 'STROKE', 'EMPTY_ARROWS', 'CURVE_BEZCURVE', 'CURVE_BEZCIRCLE', 'CURVE_NCURVE', 'CURVE_NCIRCLE', 'CURVE_PATH', 'LIGHTPROBE_CUBEMAP', 'LIGHTPROBE_PLANAR', 'LIGHTPROBE_GRID', 'COLOR_RED', 'COLOR_GREEN', 'COLOR_BLUE', 'TRIA_RIGHT_BAR', 'TRIA_DOWN_BAR', 'TRIA_LEFT_BAR', 'TRIA_UP_BAR', 'FORCE_FORCE', 'FORCE_WIND', 'FORCE_VORTEX', 'FORCE_MAGNETIC', 'FORCE_HARMONIC', 'FORCE_CHARGE', 'FORCE_LENNARDJONES', 'FORCE_TEXTURE', 'FORCE_CURVE', 'FORCE_BOID', 'FORCE_TURBULENCE', 'FORCE_DRAG', 'FORCE_SMOKEFLOW', 'RIGID_BODY', 'RIGID_BODY_CONSTRAINT', 'IMAGE_PLANE', 'IMAGE_BACKGROUND', 'IMAGE_REFERENCE', 'NODE_INSERT_ON', 'NODE_INSERT_OFF', 'NODE_TOP', 'NODE_SIDE', 'NODE_CORNER', 'SELECT_SET', 'SELECT_EXTEND', 'SELECT_SUBTRACT', 'SELECT_INTERSECT', 'SELECT_DIFFERENCE', 'ALIGN_LEFT', 'ALIGN_CENTER', 'ALIGN_RIGHT', 'ALIGN_JUSTIFY', 'ALIGN_FLUSH', 'ALIGN_TOP', 'ALIGN_MIDDLE', 'ALIGN_BOTTOM', 'BOLD', 'ITALIC', 'UNDERLINE', 'SMALL_CAPS', 'CON_ACTION', 'HOLDOUT_OFF', 'HOLDOUT_ON', 'INDIRECT_ONLY_OFF', 'INDIRECT_ONLY_ON', 'CON_CAMERASOLVER', 'CON_FOLLOWTRACK', 'CON_OBJECTSOLVER', 'CON_LOCLIKE', 'CON_ROTLIKE', 'CON_SIZELIKE', 'CON_TRANSLIKE', 'CON_DISTLIMIT', 'CON_LOCLIMIT', 'CON_ROTLIMIT', 'CON_SIZELIMIT', 'CON_SAMEVOL', 'CON_TRANSFORM', 'CON_TRANSFORM_CACHE', 'CON_CLAMPTO', 'CON_KINEMATIC', 'CON_LOCKTRACK', 'CON_SPLINEIK', 'CON_STRETCHTO', 'CON_TRACKTO', 'CON_ARMATURE', 'CON_CHILDOF', 'CON_FLOOR', 'CON_FOLLOWPATH', 'CON_PIVOT', 'CON_SHRINKWRAP', 'MODIFIER_DATA', 'MOD_WAVE', 'MOD_BUILD', 'MOD_DECIM', 'MOD_MIRROR', 'MOD_SOFT', 'MOD_SUBSURF', 'HOOK', 'MOD_PHYSICS', 'MOD_PARTICLES', 'MOD_BOOLEAN', 'MOD_EDGESPLIT', 'MOD_ARRAY', 'MOD_UVPROJECT', 'MOD_DISPLACE', 'MOD_CURVE', 'MOD_LATTICE', 'MOD_TINT', 'MOD_ARMATURE', 'MOD_SHRINKWRAP', 'MOD_CAST', 'MOD_MESHDEFORM', 'MOD_BEVEL', 'MOD_SMOOTH', 'MOD_SIMPLEDEFORM', 'MOD_MASK', 'MOD_CLOTH', 'MOD_EXPLODE', 'MOD_FLUIDSIM', 'MOD_MULTIRES', 'MOD_FLUID', 'MOD_SOLIDIFY', 'MOD_SCREW', 'MOD_VERTEX_WEIGHT', 'MOD_DYNAMICPAINT', 'MOD_REMESH', 'MOD_OCEAN', 'MOD_WARP', 'MOD_SKIN', 'MOD_TRIANGULATE', 'MOD_WIREFRAME', 'MOD_DATA_TRANSFER', 'MOD_NORMALEDIT', 'MOD_PARTICLE_INSTANCE', 'MOD_HUE_SATURATION', 'MOD_NOISE', 'MOD_OFFSET', 'MOD_SIMPLIFY', 'MOD_THICKNESS', 'MOD_INSTANCE', 'MOD_TIME', 'MOD_OPACITY', 'REC', 'PLAY', 'FF', 'REW', 'PAUSE', 'PREV_KEYFRAME', 'NEXT_KEYFRAME', 'PLAY_SOUND', 'PLAY_REVERSE', 'PREVIEW_RANGE', 'ACTION_TWEAK', 'PMARKER_ACT', 'PMARKER_SEL', 'PMARKER', 'MARKER_HLT', 'MARKER', 'KEYFRAME_HLT', 'KEYFRAME', 'KEYINGSET', 'KEY_DEHLT', 'KEY_HLT', 'MUTE_IPO_OFF', 'MUTE_IPO_ON', 'DRIVER', 'SOLO_OFF', 'SOLO_ON', 'FRAME_PREV', 'FRAME_NEXT', 'NLA_PUSHDOWN', 'IPO_CONSTANT', 'IPO_LINEAR', 'IPO_BEZIER', 'IPO_SINE', 'IPO_QUAD', 'IPO_CUBIC', 'IPO_QUART', 'IPO_QUINT', 'IPO_EXPO', 'IPO_CIRC', 'IPO_BOUNCE', 'IPO_ELASTIC', 'IPO_BACK', 'IPO_EASE_IN', 'IPO_EASE_OUT', 'IPO_EASE_IN_OUT', 'NORMALIZE_FCURVES', 'VERTEXSEL', 'EDGESEL', 'FACESEL', 'CURSOR', 'PIVOT_BOUNDBOX', 'PIVOT_CURSOR', 'PIVOT_INDIVIDUAL', 'PIVOT_MEDIAN', 'PIVOT_ACTIVE', 'CENTER_ONLY', 'ROOTCURVE', 'SMOOTHCURVE', 'SPHERECURVE', 'INVERSESQUARECURVE', 'SHARPCURVE', 'LINCURVE', 'NOCURVE', 'RNDCURVE', 'PROP_OFF', 'PROP_ON', 'PROP_CON', 'PROP_PROJECTED', 'PARTICLE_POINT', 'PARTICLE_TIP', 'PARTICLE_PATH', 'SNAP_FACE_CENTER', 'SNAP_PERPENDICULAR', 'SNAP_MIDPOINT', 'SNAP_OFF', 'SNAP_ON', 'SNAP_NORMAL', 'SNAP_GRID', 'SNAP_VERTEX', 'SNAP_EDGE', 'SNAP_FACE', 'SNAP_VOLUME', 'SNAP_INCREMENT', 'STICKY_UVS_LOC', 'STICKY_UVS_DISABLE', 'STICKY_UVS_VERT', 'CLIPUV_DEHLT', 'CLIPUV_HLT', 'SNAP_PEEL_OBJECT', 'GRID', 'OBJECT_ORIGIN', 'ORIENTATION_GLOBAL', 'ORIENTATION_GIMBAL', 'ORIENTATION_LOCAL', 'ORIENTATION_NORMAL', 'ORIENTATION_VIEW', 'COPYDOWN', 'PASTEDOWN', 'PASTEFLIPUP', 'PASTEFLIPDOWN', 'VIS_SEL_11', 'VIS_SEL_10', 'VIS_SEL_01', 'VIS_SEL_00', 'AUTOMERGE_OFF', 'AUTOMERGE_ON', 'UV_VERTEXSEL', 'UV_EDGESEL', 'UV_FACESEL', 'UV_ISLANDSEL', 'UV_SYNC_SELECT', 'TRANSFORM_ORIGINS', 'GIZMO', 'ORIENTATION_CURSOR', 'NORMALS_VERTEX', 'NORMALS_FACE', 'NORMALS_VERTEX_FACE', 'SHADING_BBOX', 'SHADING_WIRE', 'SHADING_SOLID', 'SHADING_RENDERED', 'SHADING_TEXTURE', 'OVERLAY', 'XRAY', 'LOCKVIEW_OFF', 'LOCKVIEW_ON', 'AXIS_SIDE', 'AXIS_FRONT', 'AXIS_TOP', 'LAYER_USED', 'LAYER_ACTIVE', 'HOME', 'DOCUMENTS', 'TEMP', 'SORTALPHA', 'SORTBYEXT', 'SORTTIME', 'SORTSIZE', 'SHORTDISPLAY', 'LONGDISPLAY', 'IMGDISPLAY', 'BOOKMARKS', 'FONTPREVIEW', 'FILTER', 'NEWFOLDER', 'FILE_PARENT', 'FILE_REFRESH', 'FILE_FOLDER', 'FILE_BLANK', 'FILE_BLEND', 'FILE_IMAGE', 'FILE_MOVIE', 'FILE_SCRIPT', 'FILE_SOUND', 'FILE_FONT', 'FILE_TEXT', 'SORT_DESC', 'SORT_ASC', 'LINK_BLEND', 'APPEND_BLEND', 'IMPORT', 'EXPORT', 'LOOP_BACK', 'LOOP_FORWARDS', 'BACK', 'FORWARD', 'FILE_ARCHIVE', 'FILE_CACHE', 'FILE_VOLUME', 'FILE_3D', 'FILE_HIDDEN', 'FILE_BACKUP', 'DISK_DRIVE', 'MATPLANE', 'MATSPHERE', 'MATCUBE', 'MONKEY', 'HAIR', 'ALIASED', 'ANTIALIASED', 'MAT_SPHERE_SKY', 'MATSHADERBALL', 'MATCLOTH', 'MATFLUID', 'WORDWRAP_OFF', 'WORDWRAP_ON', 'SYNTAX_OFF', 'SYNTAX_ON', 'LINENUMBERS_OFF', 'LINENUMBERS_ON', 'SCRIPTPLUGINS', 'DISC', 'DESKTOP', 'EXTERNAL_DRIVE', 'NETWORK_DRIVE', 'SEQ_SEQUENCER', 'SEQ_PREVIEW', 'SEQ_LUMA_WAVEFORM', 'SEQ_CHROMA_SCOPE', 'SEQ_HISTOGRAM', 'SEQ_SPLITVIEW', 'SEQ_STRIP_META', 'SEQ_STRIP_DUPLICATE', 'IMAGE_RGB', 'IMAGE_RGB_ALPHA', 'IMAGE_ALPHA', 'IMAGE_ZDEPTH', 'VIEW_PERSPECTIVE', 'VIEW_ORTHO', 'VIEW_CAMERA', 'VIEW_PAN', 'VIEW_ZOOM', 'BRUSH_BLOB', 'BRUSH_BLUR', 'BRUSH_CLAY', 'BRUSH_CLAY_STRIPS', 'BRUSH_CLONE', 'BRUSH_CREASE', 'BRUSH_FILL', 'BRUSH_FLATTEN', 'BRUSH_GRAB', 'BRUSH_INFLATE', 'BRUSH_LAYER', 'BRUSH_MASK', 'BRUSH_MIX', 'BRUSH_NUDGE', 'BRUSH_PINCH', 'BRUSH_SCRAPE', 'BRUSH_SCULPT_DRAW', 'BRUSH_SMEAR', 'BRUSH_SMOOTH', 'BRUSH_SNAKE_HOOK', 'BRUSH_SOFTEN', 'BRUSH_TEXDRAW', 'BRUSH_TEXFILL', 'BRUSH_TEXMASK', 'BRUSH_THUMB', 'BRUSH_ROTATE', 'GPBRUSH_SMOOTH', 'GPBRUSH_THICKNESS', 'GPBRUSH_STRENGTH', 'GPBRUSH_GRAB', 'GPBRUSH_PUSH', 'GPBRUSH_TWIST', 'GPBRUSH_PINCH', 'GPBRUSH_RANDOMIZE', 'GPBRUSH_CLONE', 'GPBRUSH_WEIGHT', 'GPBRUSH_PENCIL', 'GPBRUSH_PEN', 'GPBRUSH_INK', 'GPBRUSH_INKNOISE', 'GPBRUSH_BLOCK', 'GPBRUSH_MARKER', 'GPBRUSH_FILL', 'GPBRUSH_AIRBRUSH', 'GPBRUSH_CHISEL', 'GPBRUSH_ERASE_SOFT', 'GPBRUSH_ERASE_HARD', 'GPBRUSH_ERASE_STROKE', 'SMALL_TRI_RIGHT_VEC', 'KEYTYPE_KEYFRAME_VEC', 'KEYTYPE_BREAKDOWN_VEC', 'KEYTYPE_EXTREME_VEC', 'KEYTYPE_JITTER_VEC', 'KEYTYPE_MOVING_HOLD_VEC', 'HANDLETYPE_FREE_VEC', 'HANDLETYPE_ALIGNED_VEC', 'HANDLETYPE_VECTOR_VEC', 'HANDLETYPE_AUTO_VEC', 'HANDLETYPE_AUTO_CLAMP_VEC', 'COLORSET_01_VEC', 'COLORSET_02_VEC', 'COLORSET_03_VEC', 'COLORSET_04_VEC', 'COLORSET_05_VEC', 'COLORSET_06_VEC', 'COLORSET_07_VEC', 'COLORSET_08_VEC', 'COLORSET_09_VEC', 'COLORSET_10_VEC', 'COLORSET_11_VEC', 'COLORSET_12_VEC', 'COLORSET_13_VEC', 'COLORSET_14_VEC', 'COLORSET_15_VEC', 'COLORSET_16_VEC', 'COLORSET_17_VEC', 'COLORSET_18_VEC', 'COLORSET_19_VEC', 'COLORSET_20_VEC', 'EVENT_A', 'EVENT_B', 'EVENT_C', 'EVENT_D', 'EVENT_E', 'EVENT_F', 'EVENT_G', 'EVENT_H', 'EVENT_I', 'EVENT_J', 'EVENT_K', 'EVENT_L', 'EVENT_M', 'EVENT_N', 'EVENT_O', 'EVENT_P', 'EVENT_Q', 'EVENT_R', 'EVENT_S', 'EVENT_T', 'EVENT_U', 'EVENT_V', 'EVENT_W', 'EVENT_X', 'EVENT_Y', 'EVENT_Z', 'EVENT_SHIFT', 'EVENT_CTRL', 'EVENT_ALT', 'EVENT_OS', 'EVENT_F1', 'EVENT_F2', 'EVENT_F3', 'EVENT_F4', 'EVENT_F5', 'EVENT_F6', 'EVENT_F7', 'EVENT_F8', 'EVENT_F9', 'EVENT_F10', 'EVENT_F11', 'EVENT_F12', 'EVENT_ESC', 'EVENT_TAB', 'EVENT_PAGEUP', 'EVENT_PAGEDOWN', 'EVENT_RETURN', 'EVENT_SPACEKEY'], default 'NODE'
   */
  public set bl_icon(
    value:
      | 'NONE'
      | 'QUESTION'
      | 'ERROR'
      | 'CANCEL'
      | 'TRIA_RIGHT'
      | 'TRIA_DOWN'
      | 'TRIA_LEFT'
      | 'TRIA_UP'
      | 'ARROW_LEFTRIGHT'
      | 'PLUS'
      | 'DISCLOSURE_TRI_RIGHT'
      | 'DISCLOSURE_TRI_DOWN'
      | 'RADIOBUT_OFF'
      | 'RADIOBUT_ON'
      | 'MENU_PANEL'
      | 'BLENDER'
      | 'GRIP'
      | 'DOT'
      | 'COLLAPSEMENU'
      | 'X'
      | 'DUPLICATE'
      | 'TRASH'
      | 'COLLECTION_NEW'
      | 'OPTIONS'
      | 'NODE'
      | 'NODE_SEL'
      | 'WINDOW'
      | 'WORKSPACE'
      | 'RIGHTARROW_THIN'
      | 'BORDERMOVE'
      | 'VIEWZOOM'
      | 'ADD'
      | 'REMOVE'
      | 'PANEL_CLOSE'
      | 'COPY_ID'
      | 'EYEDROPPER'
      | 'CHECKMARK'
      | 'AUTO'
      | 'CHECKBOX_DEHLT'
      | 'CHECKBOX_HLT'
      | 'UNLOCKED'
      | 'LOCKED'
      | 'UNPINNED'
      | 'PINNED'
      | 'SCREEN_BACK'
      | 'RIGHTARROW'
      | 'DOWNARROW_HLT'
      | 'FCURVE_SNAPSHOT'
      | 'OBJECT_HIDDEN'
      | 'TOPBAR'
      | 'STATUSBAR'
      | 'PLUGIN'
      | 'HELP'
      | 'GHOST_ENABLED'
      | 'COLOR'
      | 'UNLINKED'
      | 'LINKED'
      | 'HAND'
      | 'ZOOM_ALL'
      | 'ZOOM_SELECTED'
      | 'ZOOM_PREVIOUS'
      | 'ZOOM_IN'
      | 'ZOOM_OUT'
      | 'DRIVER_DISTANCE'
      | 'DRIVER_ROTATIONAL_DIFFERENCE'
      | 'DRIVER_TRANSFORM'
      | 'FREEZE'
      | 'STYLUS_PRESSURE'
      | 'GHOST_DISABLED'
      | 'FILE_NEW'
      | 'FILE_TICK'
      | 'QUIT'
      | 'URL'
      | 'RECOVER_LAST'
      | 'THREE_DOTS'
      | 'FULLSCREEN_ENTER'
      | 'FULLSCREEN_EXIT'
      | 'LIGHT'
      | 'MATERIAL'
      | 'TEXTURE'
      | 'ANIM'
      | 'WORLD'
      | 'SCENE'
      | 'OUTPUT'
      | 'SCRIPT'
      | 'PARTICLES'
      | 'PHYSICS'
      | 'SPEAKER'
      | 'TOOL_SETTINGS'
      | 'SHADERFX'
      | 'MODIFIER'
      | 'BLANK1'
      | 'FAKE_USER_OFF'
      | 'FAKE_USER_ON'
      | 'VIEW3D'
      | 'GRAPH'
      | 'OUTLINER'
      | 'PROPERTIES'
      | 'FILEBROWSER'
      | 'IMAGE'
      | 'INFO'
      | 'SEQUENCE'
      | 'TEXT'
      | 'SOUND'
      | 'ACTION'
      | 'NLA'
      | 'PREFERENCES'
      | 'TIME'
      | 'NODETREE'
      | 'CONSOLE'
      | 'TRACKER'
      | 'ASSET_MANAGER'
      | 'NODE_COMPOSITING'
      | 'NODE_TEXTURE'
      | 'NODE_MATERIAL'
      | 'UV'
      | 'OBJECT_DATAMODE'
      | 'EDITMODE_HLT'
      | 'UV_DATA'
      | 'VPAINT_HLT'
      | 'TPAINT_HLT'
      | 'WPAINT_HLT'
      | 'SCULPTMODE_HLT'
      | 'POSE_HLT'
      | 'PARTICLEMODE'
      | 'TRACKING'
      | 'TRACKING_BACKWARDS'
      | 'TRACKING_FORWARDS'
      | 'TRACKING_BACKWARDS_SINGLE'
      | 'TRACKING_FORWARDS_SINGLE'
      | 'TRACKING_CLEAR_BACKWARDS'
      | 'TRACKING_CLEAR_FORWARDS'
      | 'TRACKING_REFINE_BACKWARDS'
      | 'TRACKING_REFINE_FORWARDS'
      | 'SCENE_DATA'
      | 'RENDERLAYERS'
      | 'WORLD_DATA'
      | 'OBJECT_DATA'
      | 'MESH_DATA'
      | 'CURVE_DATA'
      | 'META_DATA'
      | 'LATTICE_DATA'
      | 'LIGHT_DATA'
      | 'MATERIAL_DATA'
      | 'TEXTURE_DATA'
      | 'ANIM_DATA'
      | 'CAMERA_DATA'
      | 'PARTICLE_DATA'
      | 'LIBRARY_DATA_DIRECT'
      | 'GROUP'
      | 'ARMATURE_DATA'
      | 'COMMUNITY'
      | 'BONE_DATA'
      | 'CONSTRAINT'
      | 'SHAPEKEY_DATA'
      | 'CONSTRAINT_BONE'
      | 'CAMERA_STEREO'
      | 'PACKAGE'
      | 'UGLYPACKAGE'
      | 'EXPERIMENTAL'
      | 'BRUSH_DATA'
      | 'IMAGE_DATA'
      | 'FILE'
      | 'FCURVE'
      | 'FONT_DATA'
      | 'RENDER_RESULT'
      | 'SURFACE_DATA'
      | 'EMPTY_DATA'
      | 'PRESET'
      | 'RENDER_ANIMATION'
      | 'RENDER_STILL'
      | 'LIBRARY_DATA_BROKEN'
      | 'BOIDS'
      | 'STRANDS'
      | 'LIBRARY_DATA_INDIRECT'
      | 'GREASEPENCIL'
      | 'LINE_DATA'
      | 'LIBRARY_DATA_OVERRIDE'
      | 'GROUP_BONE'
      | 'GROUP_VERTEX'
      | 'GROUP_VCOL'
      | 'GROUP_UVS'
      | 'FACE_MAPS'
      | 'RNA'
      | 'RNA_ADD'
      | 'MOUSE_LMB'
      | 'MOUSE_MMB'
      | 'MOUSE_RMB'
      | 'MOUSE_MOVE'
      | 'MOUSE_LMB_DRAG'
      | 'MOUSE_MMB_DRAG'
      | 'MOUSE_RMB_DRAG'
      | 'MEMORY'
      | 'PRESET_NEW'
      | 'DECORATE'
      | 'DECORATE_KEYFRAME'
      | 'DECORATE_ANIMATE'
      | 'DECORATE_DRIVER'
      | 'DECORATE_LINKED'
      | 'DECORATE_LIBRARY_OVERRIDE'
      | 'DECORATE_UNLOCKED'
      | 'DECORATE_LOCKED'
      | 'DECORATE_OVERRIDE'
      | 'FUND'
      | 'TRACKER_DATA'
      | 'HEART'
      | 'ORPHAN_DATA'
      | 'USER'
      | 'SYSTEM'
      | 'SETTINGS'
      | 'OUTLINER_OB_EMPTY'
      | 'OUTLINER_OB_MESH'
      | 'OUTLINER_OB_CURVE'
      | 'OUTLINER_OB_LATTICE'
      | 'OUTLINER_OB_META'
      | 'OUTLINER_OB_LIGHT'
      | 'OUTLINER_OB_CAMERA'
      | 'OUTLINER_OB_ARMATURE'
      | 'OUTLINER_OB_FONT'
      | 'OUTLINER_OB_SURFACE'
      | 'OUTLINER_OB_SPEAKER'
      | 'OUTLINER_OB_FORCE_FIELD'
      | 'OUTLINER_OB_GROUP_INSTANCE'
      | 'OUTLINER_OB_GREASEPENCIL'
      | 'OUTLINER_OB_LIGHTPROBE'
      | 'OUTLINER_OB_IMAGE'
      | 'RESTRICT_COLOR_OFF'
      | 'RESTRICT_COLOR_ON'
      | 'HIDE_ON'
      | 'HIDE_OFF'
      | 'RESTRICT_SELECT_ON'
      | 'RESTRICT_SELECT_OFF'
      | 'RESTRICT_RENDER_ON'
      | 'RESTRICT_RENDER_OFF'
      | 'RESTRICT_INSTANCED_OFF'
      | 'OUTLINER_DATA_EMPTY'
      | 'OUTLINER_DATA_MESH'
      | 'OUTLINER_DATA_CURVE'
      | 'OUTLINER_DATA_LATTICE'
      | 'OUTLINER_DATA_META'
      | 'OUTLINER_DATA_LIGHT'
      | 'OUTLINER_DATA_CAMERA'
      | 'OUTLINER_DATA_ARMATURE'
      | 'OUTLINER_DATA_FONT'
      | 'OUTLINER_DATA_SURFACE'
      | 'OUTLINER_DATA_SPEAKER'
      | 'OUTLINER_DATA_LIGHTPROBE'
      | 'OUTLINER_DATA_GP_LAYER'
      | 'OUTLINER_DATA_GREASEPENCIL'
      | 'GP_SELECT_POINTS'
      | 'GP_SELECT_STROKES'
      | 'GP_MULTIFRAME_EDITING'
      | 'GP_ONLY_SELECTED'
      | 'GP_SELECT_BETWEEN_STROKES'
      | 'MODIFIER_OFF'
      | 'MODIFIER_ON'
      | 'ONIONSKIN_OFF'
      | 'ONIONSKIN_ON'
      | 'RESTRICT_VIEW_ON'
      | 'RESTRICT_VIEW_OFF'
      | 'RESTRICT_INSTANCED_ON'
      | 'MESH_PLANE'
      | 'MESH_CUBE'
      | 'MESH_CIRCLE'
      | 'MESH_UVSPHERE'
      | 'MESH_ICOSPHERE'
      | 'MESH_GRID'
      | 'MESH_MONKEY'
      | 'MESH_CYLINDER'
      | 'MESH_TORUS'
      | 'MESH_CONE'
      | 'MESH_CAPSULE'
      | 'EMPTY_SINGLE_ARROW'
      | 'LIGHT_POINT'
      | 'LIGHT_SUN'
      | 'LIGHT_SPOT'
      | 'LIGHT_HEMI'
      | 'LIGHT_AREA'
      | 'CUBE'
      | 'SPHERE'
      | 'CONE'
      | 'META_PLANE'
      | 'META_CUBE'
      | 'META_BALL'
      | 'META_ELLIPSOID'
      | 'META_CAPSULE'
      | 'SURFACE_NCURVE'
      | 'SURFACE_NCIRCLE'
      | 'SURFACE_NSURFACE'
      | 'SURFACE_NCYLINDER'
      | 'SURFACE_NSPHERE'
      | 'SURFACE_NTORUS'
      | 'EMPTY_AXIS'
      | 'STROKE'
      | 'EMPTY_ARROWS'
      | 'CURVE_BEZCURVE'
      | 'CURVE_BEZCIRCLE'
      | 'CURVE_NCURVE'
      | 'CURVE_NCIRCLE'
      | 'CURVE_PATH'
      | 'LIGHTPROBE_CUBEMAP'
      | 'LIGHTPROBE_PLANAR'
      | 'LIGHTPROBE_GRID'
      | 'COLOR_RED'
      | 'COLOR_GREEN'
      | 'COLOR_BLUE'
      | 'TRIA_RIGHT_BAR'
      | 'TRIA_DOWN_BAR'
      | 'TRIA_LEFT_BAR'
      | 'TRIA_UP_BAR'
      | 'FORCE_FORCE'
      | 'FORCE_WIND'
      | 'FORCE_VORTEX'
      | 'FORCE_MAGNETIC'
      | 'FORCE_HARMONIC'
      | 'FORCE_CHARGE'
      | 'FORCE_LENNARDJONES'
      | 'FORCE_TEXTURE'
      | 'FORCE_CURVE'
      | 'FORCE_BOID'
      | 'FORCE_TURBULENCE'
      | 'FORCE_DRAG'
      | 'FORCE_SMOKEFLOW'
      | 'RIGID_BODY'
      | 'RIGID_BODY_CONSTRAINT'
      | 'IMAGE_PLANE'
      | 'IMAGE_BACKGROUND'
      | 'IMAGE_REFERENCE'
      | 'NODE_INSERT_ON'
      | 'NODE_INSERT_OFF'
      | 'NODE_TOP'
      | 'NODE_SIDE'
      | 'NODE_CORNER'
      | 'SELECT_SET'
      | 'SELECT_EXTEND'
      | 'SELECT_SUBTRACT'
      | 'SELECT_INTERSECT'
      | 'SELECT_DIFFERENCE'
      | 'ALIGN_LEFT'
      | 'ALIGN_CENTER'
      | 'ALIGN_RIGHT'
      | 'ALIGN_JUSTIFY'
      | 'ALIGN_FLUSH'
      | 'ALIGN_TOP'
      | 'ALIGN_MIDDLE'
      | 'ALIGN_BOTTOM'
      | 'BOLD'
      | 'ITALIC'
      | 'UNDERLINE'
      | 'SMALL_CAPS'
      | 'CON_ACTION'
      | 'HOLDOUT_OFF'
      | 'HOLDOUT_ON'
      | 'INDIRECT_ONLY_OFF'
      | 'INDIRECT_ONLY_ON'
      | 'CON_CAMERASOLVER'
      | 'CON_FOLLOWTRACK'
      | 'CON_OBJECTSOLVER'
      | 'CON_LOCLIKE'
      | 'CON_ROTLIKE'
      | 'CON_SIZELIKE'
      | 'CON_TRANSLIKE'
      | 'CON_DISTLIMIT'
      | 'CON_LOCLIMIT'
      | 'CON_ROTLIMIT'
      | 'CON_SIZELIMIT'
      | 'CON_SAMEVOL'
      | 'CON_TRANSFORM'
      | 'CON_TRANSFORM_CACHE'
      | 'CON_CLAMPTO'
      | 'CON_KINEMATIC'
      | 'CON_LOCKTRACK'
      | 'CON_SPLINEIK'
      | 'CON_STRETCHTO'
      | 'CON_TRACKTO'
      | 'CON_ARMATURE'
      | 'CON_CHILDOF'
      | 'CON_FLOOR'
      | 'CON_FOLLOWPATH'
      | 'CON_PIVOT'
      | 'CON_SHRINKWRAP'
      | 'MODIFIER_DATA'
      | 'MOD_WAVE'
      | 'MOD_BUILD'
      | 'MOD_DECIM'
      | 'MOD_MIRROR'
      | 'MOD_SOFT'
      | 'MOD_SUBSURF'
      | 'HOOK'
      | 'MOD_PHYSICS'
      | 'MOD_PARTICLES'
      | 'MOD_BOOLEAN'
      | 'MOD_EDGESPLIT'
      | 'MOD_ARRAY'
      | 'MOD_UVPROJECT'
      | 'MOD_DISPLACE'
      | 'MOD_CURVE'
      | 'MOD_LATTICE'
      | 'MOD_TINT'
      | 'MOD_ARMATURE'
      | 'MOD_SHRINKWRAP'
      | 'MOD_CAST'
      | 'MOD_MESHDEFORM'
      | 'MOD_BEVEL'
      | 'MOD_SMOOTH'
      | 'MOD_SIMPLEDEFORM'
      | 'MOD_MASK'
      | 'MOD_CLOTH'
      | 'MOD_EXPLODE'
      | 'MOD_FLUIDSIM'
      | 'MOD_MULTIRES'
      | 'MOD_FLUID'
      | 'MOD_SOLIDIFY'
      | 'MOD_SCREW'
      | 'MOD_VERTEX_WEIGHT'
      | 'MOD_DYNAMICPAINT'
      | 'MOD_REMESH'
      | 'MOD_OCEAN'
      | 'MOD_WARP'
      | 'MOD_SKIN'
      | 'MOD_TRIANGULATE'
      | 'MOD_WIREFRAME'
      | 'MOD_DATA_TRANSFER'
      | 'MOD_NORMALEDIT'
      | 'MOD_PARTICLE_INSTANCE'
      | 'MOD_HUE_SATURATION'
      | 'MOD_NOISE'
      | 'MOD_OFFSET'
      | 'MOD_SIMPLIFY'
      | 'MOD_THICKNESS'
      | 'MOD_INSTANCE'
      | 'MOD_TIME'
      | 'MOD_OPACITY'
      | 'REC'
      | 'PLAY'
      | 'FF'
      | 'REW'
      | 'PAUSE'
      | 'PREV_KEYFRAME'
      | 'NEXT_KEYFRAME'
      | 'PLAY_SOUND'
      | 'PLAY_REVERSE'
      | 'PREVIEW_RANGE'
      | 'ACTION_TWEAK'
      | 'PMARKER_ACT'
      | 'PMARKER_SEL'
      | 'PMARKER'
      | 'MARKER_HLT'
      | 'MARKER'
      | 'KEYFRAME_HLT'
      | 'KEYFRAME'
      | 'KEYINGSET'
      | 'KEY_DEHLT'
      | 'KEY_HLT'
      | 'MUTE_IPO_OFF'
      | 'MUTE_IPO_ON'
      | 'DRIVER'
      | 'SOLO_OFF'
      | 'SOLO_ON'
      | 'FRAME_PREV'
      | 'FRAME_NEXT'
      | 'NLA_PUSHDOWN'
      | 'IPO_CONSTANT'
      | 'IPO_LINEAR'
      | 'IPO_BEZIER'
      | 'IPO_SINE'
      | 'IPO_QUAD'
      | 'IPO_CUBIC'
      | 'IPO_QUART'
      | 'IPO_QUINT'
      | 'IPO_EXPO'
      | 'IPO_CIRC'
      | 'IPO_BOUNCE'
      | 'IPO_ELASTIC'
      | 'IPO_BACK'
      | 'IPO_EASE_IN'
      | 'IPO_EASE_OUT'
      | 'IPO_EASE_IN_OUT'
      | 'NORMALIZE_FCURVES'
      | 'VERTEXSEL'
      | 'EDGESEL'
      | 'FACESEL'
      | 'CURSOR'
      | 'PIVOT_BOUNDBOX'
      | 'PIVOT_CURSOR'
      | 'PIVOT_INDIVIDUAL'
      | 'PIVOT_MEDIAN'
      | 'PIVOT_ACTIVE'
      | 'CENTER_ONLY'
      | 'ROOTCURVE'
      | 'SMOOTHCURVE'
      | 'SPHERECURVE'
      | 'INVERSESQUARECURVE'
      | 'SHARPCURVE'
      | 'LINCURVE'
      | 'NOCURVE'
      | 'RNDCURVE'
      | 'PROP_OFF'
      | 'PROP_ON'
      | 'PROP_CON'
      | 'PROP_PROJECTED'
      | 'PARTICLE_POINT'
      | 'PARTICLE_TIP'
      | 'PARTICLE_PATH'
      | 'SNAP_FACE_CENTER'
      | 'SNAP_PERPENDICULAR'
      | 'SNAP_MIDPOINT'
      | 'SNAP_OFF'
      | 'SNAP_ON'
      | 'SNAP_NORMAL'
      | 'SNAP_GRID'
      | 'SNAP_VERTEX'
      | 'SNAP_EDGE'
      | 'SNAP_FACE'
      | 'SNAP_VOLUME'
      | 'SNAP_INCREMENT'
      | 'STICKY_UVS_LOC'
      | 'STICKY_UVS_DISABLE'
      | 'STICKY_UVS_VERT'
      | 'CLIPUV_DEHLT'
      | 'CLIPUV_HLT'
      | 'SNAP_PEEL_OBJECT'
      | 'GRID'
      | 'OBJECT_ORIGIN'
      | 'ORIENTATION_GLOBAL'
      | 'ORIENTATION_GIMBAL'
      | 'ORIENTATION_LOCAL'
      | 'ORIENTATION_NORMAL'
      | 'ORIENTATION_VIEW'
      | 'COPYDOWN'
      | 'PASTEDOWN'
      | 'PASTEFLIPUP'
      | 'PASTEFLIPDOWN'
      | 'VIS_SEL_11'
      | 'VIS_SEL_10'
      | 'VIS_SEL_01'
      | 'VIS_SEL_00'
      | 'AUTOMERGE_OFF'
      | 'AUTOMERGE_ON'
      | 'UV_VERTEXSEL'
      | 'UV_EDGESEL'
      | 'UV_FACESEL'
      | 'UV_ISLANDSEL'
      | 'UV_SYNC_SELECT'
      | 'TRANSFORM_ORIGINS'
      | 'GIZMO'
      | 'ORIENTATION_CURSOR'
      | 'NORMALS_VERTEX'
      | 'NORMALS_FACE'
      | 'NORMALS_VERTEX_FACE'
      | 'SHADING_BBOX'
      | 'SHADING_WIRE'
      | 'SHADING_SOLID'
      | 'SHADING_RENDERED'
      | 'SHADING_TEXTURE'
      | 'OVERLAY'
      | 'XRAY'
      | 'LOCKVIEW_OFF'
      | 'LOCKVIEW_ON'
      | 'AXIS_SIDE'
      | 'AXIS_FRONT'
      | 'AXIS_TOP'
      | 'LAYER_USED'
      | 'LAYER_ACTIVE'
      | 'HOME'
      | 'DOCUMENTS'
      | 'TEMP'
      | 'SORTALPHA'
      | 'SORTBYEXT'
      | 'SORTTIME'
      | 'SORTSIZE'
      | 'SHORTDISPLAY'
      | 'LONGDISPLAY'
      | 'IMGDISPLAY'
      | 'BOOKMARKS'
      | 'FONTPREVIEW'
      | 'FILTER'
      | 'NEWFOLDER'
      | 'FILE_PARENT'
      | 'FILE_REFRESH'
      | 'FILE_FOLDER'
      | 'FILE_BLANK'
      | 'FILE_BLEND'
      | 'FILE_IMAGE'
      | 'FILE_MOVIE'
      | 'FILE_SCRIPT'
      | 'FILE_SOUND'
      | 'FILE_FONT'
      | 'FILE_TEXT'
      | 'SORT_DESC'
      | 'SORT_ASC'
      | 'LINK_BLEND'
      | 'APPEND_BLEND'
      | 'IMPORT'
      | 'EXPORT'
      | 'LOOP_BACK'
      | 'LOOP_FORWARDS'
      | 'BACK'
      | 'FORWARD'
      | 'FILE_ARCHIVE'
      | 'FILE_CACHE'
      | 'FILE_VOLUME'
      | 'FILE_3D'
      | 'FILE_HIDDEN'
      | 'FILE_BACKUP'
      | 'DISK_DRIVE'
      | 'MATPLANE'
      | 'MATSPHERE'
      | 'MATCUBE'
      | 'MONKEY'
      | 'HAIR'
      | 'ALIASED'
      | 'ANTIALIASED'
      | 'MAT_SPHERE_SKY'
      | 'MATSHADERBALL'
      | 'MATCLOTH'
      | 'MATFLUID'
      | 'WORDWRAP_OFF'
      | 'WORDWRAP_ON'
      | 'SYNTAX_OFF'
      | 'SYNTAX_ON'
      | 'LINENUMBERS_OFF'
      | 'LINENUMBERS_ON'
      | 'SCRIPTPLUGINS'
      | 'DISC'
      | 'DESKTOP'
      | 'EXTERNAL_DRIVE'
      | 'NETWORK_DRIVE'
      | 'SEQ_SEQUENCER'
      | 'SEQ_PREVIEW'
      | 'SEQ_LUMA_WAVEFORM'
      | 'SEQ_CHROMA_SCOPE'
      | 'SEQ_HISTOGRAM'
      | 'SEQ_SPLITVIEW'
      | 'SEQ_STRIP_META'
      | 'SEQ_STRIP_DUPLICATE'
      | 'IMAGE_RGB'
      | 'IMAGE_RGB_ALPHA'
      | 'IMAGE_ALPHA'
      | 'IMAGE_ZDEPTH'
      | 'VIEW_PERSPECTIVE'
      | 'VIEW_ORTHO'
      | 'VIEW_CAMERA'
      | 'VIEW_PAN'
      | 'VIEW_ZOOM'
      | 'BRUSH_BLOB'
      | 'BRUSH_BLUR'
      | 'BRUSH_CLAY'
      | 'BRUSH_CLAY_STRIPS'
      | 'BRUSH_CLONE'
      | 'BRUSH_CREASE'
      | 'BRUSH_FILL'
      | 'BRUSH_FLATTEN'
      | 'BRUSH_GRAB'
      | 'BRUSH_INFLATE'
      | 'BRUSH_LAYER'
      | 'BRUSH_MASK'
      | 'BRUSH_MIX'
      | 'BRUSH_NUDGE'
      | 'BRUSH_PINCH'
      | 'BRUSH_SCRAPE'
      | 'BRUSH_SCULPT_DRAW'
      | 'BRUSH_SMEAR'
      | 'BRUSH_SMOOTH'
      | 'BRUSH_SNAKE_HOOK'
      | 'BRUSH_SOFTEN'
      | 'BRUSH_TEXDRAW'
      | 'BRUSH_TEXFILL'
      | 'BRUSH_TEXMASK'
      | 'BRUSH_THUMB'
      | 'BRUSH_ROTATE'
      | 'GPBRUSH_SMOOTH'
      | 'GPBRUSH_THICKNESS'
      | 'GPBRUSH_STRENGTH'
      | 'GPBRUSH_GRAB'
      | 'GPBRUSH_PUSH'
      | 'GPBRUSH_TWIST'
      | 'GPBRUSH_PINCH'
      | 'GPBRUSH_RANDOMIZE'
      | 'GPBRUSH_CLONE'
      | 'GPBRUSH_WEIGHT'
      | 'GPBRUSH_PENCIL'
      | 'GPBRUSH_PEN'
      | 'GPBRUSH_INK'
      | 'GPBRUSH_INKNOISE'
      | 'GPBRUSH_BLOCK'
      | 'GPBRUSH_MARKER'
      | 'GPBRUSH_FILL'
      | 'GPBRUSH_AIRBRUSH'
      | 'GPBRUSH_CHISEL'
      | 'GPBRUSH_ERASE_SOFT'
      | 'GPBRUSH_ERASE_HARD'
      | 'GPBRUSH_ERASE_STROKE'
      | 'SMALL_TRI_RIGHT_VEC'
      | 'KEYTYPE_KEYFRAME_VEC'
      | 'KEYTYPE_BREAKDOWN_VEC'
      | 'KEYTYPE_EXTREME_VEC'
      | 'KEYTYPE_JITTER_VEC'
      | 'KEYTYPE_MOVING_HOLD_VEC'
      | 'HANDLETYPE_FREE_VEC'
      | 'HANDLETYPE_ALIGNED_VEC'
      | 'HANDLETYPE_VECTOR_VEC'
      | 'HANDLETYPE_AUTO_VEC'
      | 'HANDLETYPE_AUTO_CLAMP_VEC'
      | 'COLORSET_01_VEC'
      | 'COLORSET_02_VEC'
      | 'COLORSET_03_VEC'
      | 'COLORSET_04_VEC'
      | 'COLORSET_05_VEC'
      | 'COLORSET_06_VEC'
      | 'COLORSET_07_VEC'
      | 'COLORSET_08_VEC'
      | 'COLORSET_09_VEC'
      | 'COLORSET_10_VEC'
      | 'COLORSET_11_VEC'
      | 'COLORSET_12_VEC'
      | 'COLORSET_13_VEC'
      | 'COLORSET_14_VEC'
      | 'COLORSET_15_VEC'
      | 'COLORSET_16_VEC'
      | 'COLORSET_17_VEC'
      | 'COLORSET_18_VEC'
      | 'COLORSET_19_VEC'
      | 'COLORSET_20_VEC'
      | 'EVENT_A'
      | 'EVENT_B'
      | 'EVENT_C'
      | 'EVENT_D'
      | 'EVENT_E'
      | 'EVENT_F'
      | 'EVENT_G'
      | 'EVENT_H'
      | 'EVENT_I'
      | 'EVENT_J'
      | 'EVENT_K'
      | 'EVENT_L'
      | 'EVENT_M'
      | 'EVENT_N'
      | 'EVENT_O'
      | 'EVENT_P'
      | 'EVENT_Q'
      | 'EVENT_R'
      | 'EVENT_S'
      | 'EVENT_T'
      | 'EVENT_U'
      | 'EVENT_V'
      | 'EVENT_W'
      | 'EVENT_X'
      | 'EVENT_Y'
      | 'EVENT_Z'
      | 'EVENT_SHIFT'
      | 'EVENT_CTRL'
      | 'EVENT_ALT'
      | 'EVENT_OS'
      | 'EVENT_F1'
      | 'EVENT_F2'
      | 'EVENT_F3'
      | 'EVENT_F4'
      | 'EVENT_F5'
      | 'EVENT_F6'
      | 'EVENT_F7'
      | 'EVENT_F8'
      | 'EVENT_F9'
      | 'EVENT_F10'
      | 'EVENT_F11'
      | 'EVENT_F12'
      | 'EVENT_ESC'
      | 'EVENT_TAB'
      | 'EVENT_PAGEUP'
      | 'EVENT_PAGEDOWN'
      | 'EVENT_RETURN'
      | 'EVENT_SPACEKEY'
  ) {
    PythonInterop.setEnum(this.interop, `${this.accessor}.bl_icon`, value)
  }

  /**
   *
   * @desc string, default '', (never None)
   */
  public set bl_idname(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.bl_idname`, value)
  }

  /**
   * The node label
   * @desc string, default '', (never None)
   */
  public set bl_label(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.bl_label`, value)
  }

  /**
   * Node type (deprecated, use with care)
   * @desc enum in ['CUSTOM'], default 'CUSTOM'
   */
  public set bl_static_type(value: 'CUSTOM') {
    PythonInterop.setEnum(this.interop, `${this.accessor}.bl_static_type`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_width_default(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_width_default`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_width_max(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_width_max`, value)
  }

  /**
   *
   * @desc float in [0, inf], default 0.0
   */
  public set bl_width_min(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.bl_width_min`, value)
  }

  /**
   * Custom color of the node body
   * @desc float array of 3 items in [0, 1], default (0.0, 0.0, 0.0)
   */
  public set color(value: [number, number, number]) {
    PythonInterop.setArray(this.interop, `${this.accessor}.color`, value)
  }

  /**
   * Height of the node
   * @desc float in [-inf, inf], default 0.0
   */
  public set height(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.height`, value)
  }

  /**
   *
   * @desc boolean, default False
   */
  public set hide(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.hide`, value)
  }

  /**
   * Optional custom node label
   * @desc string, default '', (never None)
   */
  public set label(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.label`, value)
  }

  /**
   *
   * @desc float array of 2 items in [-100000, 100000], default (0.0, 0.0)
   */
  public set location(value: [number, number]) {
    PythonInterop.setArray(this.interop, `${this.accessor}.location`, value)
  }

  /**
   *
   * @desc boolean, default False
   */
  public set mute(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.mute`, value)
  }

  /**
   * Unique node identifier
   * @desc string, default '', (never None)
   */
  public set name(value: string) {
    PythonInterop.setString(this.interop, `${this.accessor}.name`, value)
  }

  /**
   * Parent this node is attached to
   * @desc Node
   */
  public set parent(value: Node) {
    PythonInterop.setClass(this.interop, `${this.accessor}.parent`, value)
  }

  /**
   * Node selection state
   * @desc boolean, default False
   */
  public set select(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.select`, value)
  }

  /**
   *
   * @desc boolean, default False
   */
  public set show_options(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.show_options`, value)
  }

  /**
   *
   * @desc boolean, default False
   */
  public set show_preview(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.show_preview`, value)
  }

  /**
   * Draw node in viewport textured draw mode
   * @desc boolean, default False
   */
  public set show_texture(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.show_texture`, value)
  }

  /**
   * Use custom color for the node
   * @desc boolean, default False
   */
  public set use_custom_color(value: boolean) {
    PythonInterop.setBoolean(this.interop, `${this.accessor}.use_custom_color`, value)
  }

  /**
   * Width of the node
   * @desc float in [-inf, inf], default 0.0
   */
  public set width(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.width`, value)
  }

  /**
   * Width of the node in hidden state
   * @desc float in [-inf, inf], default 0.0
   */
  public set width_hidden(value: number) {
    PythonInterop.setFloat(this.interop, `${this.accessor}.width_hidden`, value)
  }

  /**
   * Update after property changes
   * @desc void
   */
  public socket_value_update(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.socket_value_update`, {})
  }

  /**
   * If non-null output is returned, the node can be added to the tree
   * @desc boolean
   */
  public poll_instance(options: { node_tree?: unknown }): boolean {
    return PythonInterop.callBoolean(this.interop, `${this.accessor}.poll_instance`, options)
  }

  /**
   * Update on editor changes
   * @desc void
   */
  public update(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.update`, {})
  }

  /**
   * Handle creation of a link to or from the node
   * @desc void
   */
  public insert_link(options: { link?: unknown }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.insert_link`, options)
  }

  /**
   * Initialize a new instance of this node
   * @desc void
   */
  public init(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.init`, {})
  }

  /**
   * Initialize a new instance of this node from an existing node
   * @desc void
   */
  public copy(options: { node?: unknown }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.copy`, options)
  }

  /**
   * Clean up node on removal
   * @desc void
   */
  public free(): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.free`, {})
  }

  /**
   * Draw node buttons
   * @desc void
   */
  public draw_buttons(options: { layout?: unknown }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.draw_buttons`, options)
  }

  /**
   * Draw node buttons in the sidebar
   * @desc void
   */
  public draw_buttons_ext(options: { layout?: unknown }): void {
    return PythonInterop.callVoid(this.interop, `${this.accessor}.draw_buttons_ext`, options)
  }

  /**
   * Returns a dynamic label string
   * @desc string, (never None)
   */
  public draw_label(): string {
    return PythonInterop.callString(this.interop, `${this.accessor}.draw_label`, {})
  }

  [util.inspect.custom]() {
    return this.accessor
  }
}
