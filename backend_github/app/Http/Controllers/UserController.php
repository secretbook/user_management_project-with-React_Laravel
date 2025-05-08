<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller {
    /**
    * Display a listing of the resource.
    */

    public function index() {
        //
        $data = User::orderBy( 'created_at', 'desc' )->get();
        // Sorting by 'created_at' in descending order
        if ( $data->isNotEmpty() ) {
            return response()->json( [ 'result' => $data, 'status' => true ] );
        } else {
            return response()->json( [ 'result' => [], 'status' => false ] );
        }
    }

    /**
    * Show the form for creating a new resource.
    */

    public function create() {
        //
    }

    /**
    * Store a newly created resource in storage.
    */

    public function store( Request $request ) {
        //
        $store_data = User::create( [
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt( $request->password ), ] );

            if ( $store_data ) {
                return response()->json( [ 'result'=>[ $store_data ], 'message'=>'successfully created', 'status'=>true ] );
            } else {
                return response()->json( [ 'result'=>[], 'message'=>'Something Went Wrong...', 'status'=>true ] );
            }
        }

        /**
        * Display the specified resource.
        */

        public function show(string $id) {
            // Try to find the user by ID
            $user = User::find($id);

            // Check if the user was found
            if ($user) {
                // Return the user data in JSON format
                return response()->json([
                    'result' => $user,
                    'message' => 'User Found Successfully',
                    'status' => true
                ], 200); // 200 OK
            } else {
                // Return an error response if the user is not found
                return response()->json([
                    'success' => false,
                    'message' => 'User not found'
                ], 404); // 404 Not Found
            }
        }

        /**
        * Show the form for editing the specified resource.
        */

        public function edit( string $id ) {
            $edit_data = User::where( 'id', $id )->first();
            // Correct the method here

            if ( $edit_data ) {
                return response()->json( [
                    'result' => $edit_data,
                    'message' => 'Fetch Data Successfully',
                    'status' => true
                ] );
            } else {
                return response()->json( [
                    'result' => [],
                    'message' => 'Something Went Wrong...',
                    'status' => false
                ] );
            }
        }

        /**
        * Update the specified resource in storage.
        */

        public function update( Request $request, string $id ) {
            // Step 1: Validate the incoming request data
            $validatedData = $request->validate( [
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255|unique:users,email,' . $id,  // Unique check excluding the current user's email
    ]);

    // Step 2: Find the user by ID
    $user = User::find($id);

    if (!$user) {
        // Step 3: If user doesn't exist, return an error response
                return response()->json( [
                    'message' => 'User not found',
                    'status' => false
                ], 404 );
            }

            // Step 4: Update the user data
            $user->name = $validatedData[ 'name' ];
            $user->email = $validatedData[ 'email' ];

            // Step 5: Save the updated user data
            $user->save();

            // Step 6: Return success response
            return response()->json( [
                'message' => 'User updated successfully',
                'status' => true,
                'result' => $user
            ], 200 );
        }

        /**
        * Remove the specified resource from storage.
        */

        public function destroy(string $id)
        {

                // Step 1: Find the user by ID using findOrFail
                $user = User::findOrFail($id);

                // Step 2: Delete the user
               if( $user->delete()){

                // Step 3: Return success response
                return response()->json([
                    'message' => 'User deleted successfully',
                    'status' => true
                ], 200);
            } else {
                // If the user is not found, return an error response
                return response()->json([
                    'message' => 'User not found',
                    'status' => false
                ], 404);
            }
        }

    }
