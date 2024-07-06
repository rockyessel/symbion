#![no_std]

use deconnect_users_io::*;
use gstd::msg;

#[no_mangle]
unsafe extern "C" fn handle() {
    let user_action: UserAction = msg::load().expect("Failed to load user_action");
    let result = handle_user_action(user_action);
    msg::reply(result, 0).expect("Failed to send reply.");
}

#[no_mangle]
extern "C" fn state() {
    let query: UserStateQuery = msg::load().expect("Unable to load the state query");
    let result = handle_user_state_query(query);
    msg::reply(result, 0).expect("Failed to send state reply.");
}
