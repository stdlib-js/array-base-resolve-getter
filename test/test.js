/**
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

'use strict';

// MODULES //

var tape = require( 'tape' );
var filled = require( '@stdlib/array-filled' );
var accessorArray = require( '@stdlib/array-base-accessor' );
var Complex128Array = require( '@stdlib/array-complex128' );
var Complex64Array = require( '@stdlib/array-complex64' );
var real = require( '@stdlib/complex-float64-real' );
var imag = require( '@stdlib/complex-float64-imag' );
var realf = require( '@stdlib/complex-float32-real' );
var imagf = require( '@stdlib/complex-float32-imag' );
var zeroTo = require( '@stdlib/array-base-zero-to' );
var dtypes = require( '@stdlib/array-typed-real-dtypes' );
var resolveGetter = require( './../lib' );


// VARIABLES //

var DTYPES = dtypes();
DTYPES.push( 'generic' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof resolveGetter, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function for returning an array element (indexed)', function test( t ) {
	var arr;
	var get;
	var dt;
	var v;
	var i;

	for ( i = 0; i < DTYPES.length; i++ ) {
		dt = DTYPES[ i ];
		arr = filled( i+1, 10, dt );
		get = resolveGetter( arr );
		v = get( arr, 2 );
		t.strictEqual( v, i+1, 'returns expected value for dtype: '+dt );
	}
	t.end();
});

tape( 'the function returns a function for returning an array element (accessor)', function test( t ) {
	var arr;
	var get;
	var v;

	arr = new Complex128Array( zeroTo( 10 ) );
	get = resolveGetter( arr );
	v = get( arr, 2 );
	t.strictEqual( real( v ), 4.0, 'returns expected value' );
	t.strictEqual( imag( v ), 5.0, 'returns expected value' );

	arr = new Complex64Array( zeroTo( 10 ) );
	get = resolveGetter( arr );
	v = get( arr, 2 );
	t.strictEqual( realf( v ), 4.0, 'returns expected value' );
	t.strictEqual( imagf( v ), 5.0, 'returns expected value' );

	t.end();
});

tape( 'the function returns a function for returning an array element (indexed; unrecognized dtype)', function test( t ) {
	var arr;
	var get;
	var v;

	arr = filled( 2, 10, 'generic' );
	get = resolveGetter( 'beep boop' );
	v = get( arr, 2 );
	t.strictEqual( v, 2, 'returns expected value' );

	t.end();
});

tape( 'the function returns a function for returning an array element (accessor; unrecognized dtype)', function test( t ) {
	var arr;
	var get;
	var v;

	arr = accessorArray( [ 1, 2, 3, 4 ] );
	get = resolveGetter( arr );
	v = get( arr, 2 );
	t.strictEqual( v, 3, 'returns expected value' );

	t.end();
});

tape( 'the returned function does not perform bounds checks (indexed)', function test( t ) {
	var arr;
	var get;
	var dt;
	var v;
	var i;

	for ( i = 0; i < DTYPES.length; i++ ) {
		dt = DTYPES[ i ];
		arr = filled( i+1, 10, dt );
		get = resolveGetter( arr );
		v = get( arr, arr.length+10 );
		t.strictEqual( v, void 0, 'returns expected value for dtype: '+dt );
	}
	t.end();
});

tape( 'the returned function does not perform bounds checks (accessor)', function test( t ) {
	var arr;
	var get;
	var v;

	arr = new Complex128Array( zeroTo( 10 ) );
	get = resolveGetter( arr );
	v = get( arr, arr.length+10 );
	t.strictEqual( v, void 0, 'returns expected value' );

	arr = new Complex64Array( zeroTo( 10 ) );
	get = resolveGetter( arr );
	v = get( arr, arr.length+10 );
	t.strictEqual( v, void 0, 'returns expected value' );

	t.end();
});

tape( 'the returned function does not perform bounds checks (indexed; unrecognized dtype)', function test( t ) {
	var arr;
	var get;
	var v;

	get = resolveGetter( 'beep boop' );
	arr = filled( 2, 10, 'generic' );
	v = get( arr, arr.length+10 );
	t.strictEqual( v, void 0, 'returns expected value' );

	t.end();
});

tape( 'the returned function does not perform bounds checks (accessor; unrecognized dtype)', function test( t ) {
	var arr;
	var get;
	var v;

	arr = accessorArray( [] );
	get = resolveGetter( arr );
	v = get( arr, arr.length+10 );
	t.strictEqual( v, void 0, 'returns expected value' );

	t.end();
});
