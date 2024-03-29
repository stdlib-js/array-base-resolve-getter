/*
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import AccessorArray = require( '@stdlib/array-base-accessor' );
import Complex128Array = require( '@stdlib/array-complex128' );
import Complex64Array = require( '@stdlib/array-complex64' );
import resolveGetter = require( './index' );


// TESTS //

// The function returns a function...
{
	resolveGetter( new Float64Array( 0 ) ); // $ExpectType GetFloat64
	resolveGetter( new Float32Array( 0 ) ); // $ExpectType GetFloat32
	resolveGetter( new Int32Array( 0 ) ); // $ExpectType GetInt32
	resolveGetter( new Int16Array( 0 ) ); // $ExpectType GetInt16
	resolveGetter( new Int8Array( 0 ) ); // $ExpectType GetInt8
	resolveGetter( new Uint32Array( 0 ) ); // $ExpectType GetUint32
	resolveGetter( new Uint16Array( 0 ) ); // $ExpectType GetUint16
	resolveGetter( new Uint8Array( 0 ) ); // $ExpectType GetUint8
	resolveGetter( new Uint8ClampedArray( 0 ) ); // $ExpectType GetUint8c
	resolveGetter( new Complex128Array( 0 ) ); // $ExpectType GetComplex128
	resolveGetter( new Complex64Array( 0 ) ); // $ExpectType GetComplex64
	resolveGetter( new AccessorArray( [ 1, 2, 3 ] ) ); // $ExpectType GetAccessorArrayLike<number>
	resolveGetter<any>( [] ); // $ExpectType GetGeneric<any>
	resolveGetter<number>( [] ); // $ExpectType GetGeneric<number>
}

// The compiler throws an error if the function is provided a first argument which is not an array-like object...
{
	resolveGetter( 5 ); // $ExpectError
	resolveGetter( true ); // $ExpectError
	resolveGetter( false ); // $ExpectError
	resolveGetter( null ); // $ExpectError
	resolveGetter( {} ); // $ExpectError
	resolveGetter( ( x: number ): number => x ); // $ExpectError
}

// The compiler throws an error if the function is provided an unsupported number of arguments...
{
	resolveGetter(); // $ExpectError
	resolveGetter( [ 1, 2, 3 ], {} ); // $ExpectError
}

// The function returns a function which returns an array element...
{
	const x1 = [ 1, 2, 3, 4 ];
	const get1 = resolveGetter<number>( x1 );
	get1( x1, 2 ); // $ExpectType number | void

	const x2 = new Float64Array( [ 1, 2, 3, 4 ] );
	const get2 = resolveGetter( x2 );
	get2( x2, 2 ); // $ExpectType number | void

	const x3 = new Float32Array( [ 1, 2, 3, 4 ] );
	const get3 = resolveGetter( x3 );
	get3( x3, 2 ); // $ExpectType number | void

	const x4 = new Int32Array( [ 1, 2, 3, 4 ] );
	const get4 = resolveGetter( x4 );
	get4( x4, 2 ); // $ExpectType number | void

	const x5 = new Int16Array( [ 1, 2, 3, 4 ] );
	const get5 = resolveGetter( x5 );
	get5( x5, 2 ); // $ExpectType number | void

	const x6 = new Int8Array( [ 1, 2, 3, 4 ] );
	const get6 = resolveGetter( x6 );
	get6( x6, 2 ); // $ExpectType number | void

	const x7 = new Uint32Array( [ 1, 2, 3, 4 ] );
	const get7 = resolveGetter( x7 );
	get7( x7, 2 ); // $ExpectType number | void

	const x8 = new Uint16Array( [ 1, 2, 3, 4 ] );
	const get8 = resolveGetter( x8 );
	get8( x8, 2 ); // $ExpectType number | void

	const x9 = new Uint8Array( [ 1, 2, 3, 4 ] );
	const get9 = resolveGetter( x9 );
	get9( x9, 2 ); // $ExpectType number | void

	const x10 = new Uint8ClampedArray( [ 1, 2, 3, 4 ] );
	const get10 = resolveGetter( x10 );
	get10( x10, 2 ); // $ExpectType number | void

	const x11 = new Complex128Array( [ 1, 2, 3, 4 ] );
	const get11 = resolveGetter( x11 );
	get11( x11, 0 ); // $ExpectType void | Complex128

	const x12 = new Complex64Array( [ 1, 2, 3, 4 ] );
	const get12 = resolveGetter( x12 );
	get12( x12, 0 ); // $ExpectType void | Complex64

	const x13 = new AccessorArray( [ 1, 2, 3, 4 ] );
	const get13 = resolveGetter( x13 );
	get13( x13, 0 ); // $ExpectType number
}

// The compiler throws an error if the returned function is provided a first argument which is not a collection...
{
	const get1 = resolveGetter( [ 1, 2, 3, 4 ] );
	get1( 5, 2 ); // $ExpectError
	get1( true, 2 ); // $ExpectError
	get1( false, 2 ); // $ExpectError
	get1( null, 2 ); // $ExpectError
	get1( {}, 2 ); // $ExpectError

	const get2 = resolveGetter( new Float64Array( 0 ) );
	get2( 5, 2 ); // $ExpectError
	get2( true, 2 ); // $ExpectError
	get2( false, 2 ); // $ExpectError
	get2( null, 2 ); // $ExpectError
	get2( {}, 2 ); // $ExpectError

	const get3 = resolveGetter( new Float32Array( 0 ) );
	get3( 5, 2 ); // $ExpectError
	get3( true, 2 ); // $ExpectError
	get3( false, 2 ); // $ExpectError
	get3( null, 2 ); // $ExpectError
	get3( {}, 2 ); // $ExpectError

	const get4 = resolveGetter( new Int32Array( 0 ) );
	get4( 5, 2 ); // $ExpectError
	get4( true, 2 ); // $ExpectError
	get4( false, 2 ); // $ExpectError
	get4( null, 2 ); // $ExpectError
	get4( {}, 2 ); // $ExpectError

	const get5 = resolveGetter( new Int16Array( 0 ) );
	get5( 5, 2 ); // $ExpectError
	get5( true, 2 ); // $ExpectError
	get5( false, 2 ); // $ExpectError
	get5( null, 2 ); // $ExpectError
	get5( {}, 2 ); // $ExpectError

	const get6 = resolveGetter( new Int8Array( 0 ) );
	get6( 5, 2 ); // $ExpectError
	get6( true, 2 ); // $ExpectError
	get6( false, 2 ); // $ExpectError
	get6( null, 2 ); // $ExpectError
	get6( {}, 2 ); // $ExpectError

	const get7 = resolveGetter( new Uint32Array( 0 ) );
	get7( 5, 2 ); // $ExpectError
	get7( true, 2 ); // $ExpectError
	get7( false, 2 ); // $ExpectError
	get7( null, 2 ); // $ExpectError
	get7( {}, 2 ); // $ExpectError

	const get8 = resolveGetter( new Uint16Array( 0 ) );
	get8( 5, 2 ); // $ExpectError
	get8( true, 2 ); // $ExpectError
	get8( false, 2 ); // $ExpectError
	get8( null, 2 ); // $ExpectError
	get8( {}, 2 ); // $ExpectError

	const get9 = resolveGetter( new Uint8Array( 0 ) );
	get9( 5, 2 ); // $ExpectError
	get9( true, 2 ); // $ExpectError
	get9( false, 2 ); // $ExpectError
	get9( null, 2 ); // $ExpectError
	get9( {}, 2 ); // $ExpectError

	const get10 = resolveGetter( new Uint8ClampedArray( 0 ) );
	get10( 5, 2 ); // $ExpectError
	get10( true, 2 ); // $ExpectError
	get10( false, 2 ); // $ExpectError
	get10( null, 2 ); // $ExpectError
	get10( {}, 2 ); // $ExpectError

	const get11 = resolveGetter( new Complex128Array( 0 ) );
	get11( 5, 2 ); // $ExpectError
	get11( true, 2 ); // $ExpectError
	get11( false, 2 ); // $ExpectError
	get11( null, 2 ); // $ExpectError
	get11( {}, 2 ); // $ExpectError

	const get12 = resolveGetter( new Complex64Array( 0 ) );
	get12( 5, 2 ); // $ExpectError
	get12( true, 2 ); // $ExpectError
	get12( false, 2 ); // $ExpectError
	get12( null, 2 ); // $ExpectError
	get12( {}, 2 ); // $ExpectError

	const get13 = resolveGetter( new AccessorArray( [ 1, 2, 3, 4 ] ) );
	get13( 5, 2 ); // $ExpectError
	get13( true, 2 ); // $ExpectError
	get13( false, 2 ); // $ExpectError
	get13( null, 2 ); // $ExpectError
	get13( {}, 2 ); // $ExpectError
}

// The compiler throws an error if the returned function is provided a second argument which is not a number...
{
	const get1 = resolveGetter( [ 0, 1, 2, 3, 4 ] );
	get1( [ 1, 2, 3, 4 ], '5' ); // $ExpectError
	get1( [ 1, 2, 3, 4 ], true ); // $ExpectError
	get1( [ 1, 2, 3, 4 ], false ); // $ExpectError
	get1( [ 1, 2, 3, 4 ], null ); // $ExpectError
	get1( [ 1, 2, 3, 4 ], {} ); // $ExpectError

	const get2 = resolveGetter( new Float64Array( 0 ) );
	get2( new Float64Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get2( new Float64Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get2( new Float64Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get2( new Float64Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get2( new Float64Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get3 = resolveGetter( new Float32Array( 0 ) );
	get3( new Float32Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get3( new Float32Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get3( new Float32Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get3( new Float32Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get3( new Float32Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get4 = resolveGetter( new Int32Array( 0 ) );
	get4( new Int32Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get4( new Int32Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get4( new Int32Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get4( new Int32Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get4( new Int32Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get5 = resolveGetter( new Int16Array( 0 ) );
	get5( new Int16Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get5( new Int16Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get5( new Int16Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get5( new Int16Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get5( new Int16Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get6 = resolveGetter( new Int8Array( 0 ) );
	get6( new Int8Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get6( new Int8Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get6( new Int8Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get6( new Int8Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get6( new Int8Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get7 = resolveGetter( new Uint32Array( 0 ) );
	get7( new Uint32Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get7( new Uint32Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get7( new Uint32Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get7( new Uint32Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get7( new Uint32Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get8 = resolveGetter( new Uint16Array( 0 ) );
	get8( new Uint16Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get8( new Uint16Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get8( new Uint16Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get8( new Uint16Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get8( new Uint16Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get9 = resolveGetter( new Uint8Array( 0 ) );
	get9( new Uint8Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get9( new Uint8Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get9( new Uint8Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get9( new Uint8Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get9( new Uint8Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get10 = resolveGetter( new Uint8ClampedArray( 0 ) );
	get10( new Uint8ClampedArray( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get10( new Uint8ClampedArray( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get10( new Uint8ClampedArray( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get10( new Uint8ClampedArray( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get10( new Uint8ClampedArray( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get11 = resolveGetter( new Complex128Array( 0 ) );
	get11( new Complex128Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get11( new Complex128Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get11( new Complex128Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get11( new Complex128Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get11( new Complex128Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get12 = resolveGetter( new Complex64Array( 0 ) );
	get12( new Complex64Array( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get12( new Complex64Array( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get12( new Complex64Array( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get12( new Complex64Array( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get12( new Complex64Array( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError

	const get13 = resolveGetter( new AccessorArray( [ 1, 2, 3, 4 ] ) );
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), '5' ); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), true ); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), false ); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), null ); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), {} ); // $ExpectError
}

// The compiler throws an error if the returned function is provided an unsupported number of arguments...
{
	const get1 = resolveGetter( [] );
	get1(); // $ExpectError
	get1( [] ); // $ExpectError
	get1( [], 1, 2 ); // $ExpectError

	const get2 = resolveGetter( new Float64Array( 0 ) );
	get2(); // $ExpectError
	get2( new Float64Array( [] ) ); // $ExpectError
	get2( new Float64Array( [] ), 1, 2 ); // $ExpectError

	const get3 = resolveGetter( new Float32Array( 0 ) );
	get3(); // $ExpectError
	get3( new Float32Array( [] ) ); // $ExpectError
	get3( new Float32Array( [] ), 1, 2 ); // $ExpectError

	const get4 = resolveGetter( new Int32Array( 0 ) );
	get4(); // $ExpectError
	get4( new Int32Array( [] ) ); // $ExpectError
	get4( new Int32Array( [] ), 1, 2 ); // $ExpectError

	const get5 = resolveGetter( new Int16Array( 0 ) );
	get5(); // $ExpectError
	get5( new Int16Array( [] ) ); // $ExpectError
	get5( new Int16Array( [] ), 1, 2 ); // $ExpectError

	const get6 = resolveGetter( new Int8Array( 0 ) );
	get6(); // $ExpectError
	get6( new Int8Array( [] ) ); // $ExpectError
	get6( new Int8Array( [] ), 1, 2 ); // $ExpectError

	const get7 = resolveGetter( new Uint32Array( 0 ) );
	get7(); // $ExpectError
	get7( new Uint32Array( [] ) ); // $ExpectError
	get7( new Uint32Array( [] ), 1, 2 ); // $ExpectError

	const get8 = resolveGetter( new Uint16Array( 0 ) );
	get8(); // $ExpectError
	get8( new Uint16Array( [] ) ); // $ExpectError
	get8( new Uint16Array( [] ), 1, 2 ); // $ExpectError

	const get9 = resolveGetter( new Uint8Array( 0 ) );
	get9(); // $ExpectError
	get9( new Uint8Array( [] ) ); // $ExpectError
	get9( new Uint8Array( [] ), 1, 2 ); // $ExpectError

	const get10 = resolveGetter( new Uint8ClampedArray( 0 ) );
	get10(); // $ExpectError
	get10( new Uint8ClampedArray( [] ) ); // $ExpectError
	get10( new Uint8ClampedArray( [] ), 1, 2 ); // $ExpectError

	const get11 = resolveGetter( new Complex128Array( 0 ) );
	get11(); // $ExpectError
	get11( new Complex128Array( 0 ) ); // $ExpectError
	get11( new Complex128Array( 0 ), 1, 2 ); // $ExpectError

	const get12 = resolveGetter( new Complex64Array( 0 ) );
	get12(); // $ExpectError
	get12( new Complex64Array( 0 ) ); // $ExpectError
	get12( new Complex64Array( 0 ), 1, 2 ); // $ExpectError

	const get13 = resolveGetter( new AccessorArray( [ 1, 2, 3, 4 ] ) );
	get13(); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ) ); // $ExpectError
	get13( new AccessorArray( [ 1, 2, 3, 4 ] ), 1, 2 ); // $ExpectError
}
