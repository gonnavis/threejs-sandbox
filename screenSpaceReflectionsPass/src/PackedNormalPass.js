import { ShaderReplacement } from '../../shader-replacement/src/ShaderReplacement.js';
import { PackedShader } from './PackedShader.js';

export class PackedNormalPass extends ShaderReplacement {

	constructor() {

		super( PackedShader )

	}

	updateUniforms( object, material, target ) {

		super.updateUniforms( object, material, target );

		let originalDefine;

		// roughness
		originalDefine = target.defines.USE_ROUGHNESSMAP;
		if ( target.uniforms.roughnessMap.value ) {

			target.defines.USE_ROUGHNESSMAP = '';

		} else {

			delete target.defines.USE_ROUGHNESSMAP;

		}

		if ( originalDefine !== target.defines.USE_ROUGHNESSMAP ) {

			target.needsUpdate = true;
		}

		// normalmap
		originalDefine = target.defines.USE_NORMALMAP;
		if ( target.uniforms.normalMap.value ) {

			target.defines.USE_NORMALMAP = '';
			target.defines.TANGENTSPACE_NORMALMAP = '';

		} else {

			delete target.defines.USE_NORMALMAP;
			delete target.defines.TANGENTSPACE_NORMALMAP;

		}

		if ( originalDefine !== target.defines.USE_NORMALMAP ) {

			target.needsUpdate = true;
		}

		// alphatest
		originalDefine = target.defines.ALPHATEST;
		if ( target.uniforms.alphaTest.value === 0 ) {

			delete target.defines.ALPHATEST;

		} else {

			target.defines.ALPHATEST = target.uniforms.alphaTest.value;

		}

		if ( originalDefine !== target.defines.ALPHATEST ) {

			target.needsUpdate = true;

		}

		// alphamap
		originalDefine = target.defines.USE_ALPHAMAP;
		if ( ! target.uniforms.alphaMap.value ) {

			delete target.defines.USE_ALPHAMAP;

		} else {

			target.defines.USE_ALPHAMAP = '';

		}

		if ( originalDefine !== target.defines.USE_ALPHAMAP ) {

			target.needsUpdate = true;
		}

		// map
		originalDefine = target.defines.USE_MAP;
		if ( ! target.uniforms.map.value ) {

			delete target.defines.USE_MAP;

		} else {

			target.defines.USE_MAP = '';

		}

		if ( originalDefine !== target.defines.USE_MAP ) {

			target.needsUpdate = true;
		}

		// uv
		originalDefine = target.defines.USE_UV;
		if ( 'USE_ALPHAMAP' in target.defines || 'USE_MAP' in target.defines ) {

			target.defines.USE_UV = '';

		} else {

			delete target.defines.USE_UV;

		}

		if ( originalDefine !== target.defines.USE_UV ) {

			target.needsUpdate = true;
		}

	}

}
