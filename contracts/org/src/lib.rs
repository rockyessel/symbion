#![no_std]

use org_io::*;
use gstd::{errors::Result, msg};

#[gstd::async_main]
async fn main() {
    // Await the process_handle function and reply with the result
    let result = process_handle().await;
    msg::reply(result, 0).expect("Failed to encode or reply `process_handle`");
}

async fn process_handle() -> Result<OrgEvent, OrgEventError> {
    // Attempt to load and decode the incoming message
    let org_action_result: OrgAction = msg::load().expect("Failed to load OrgAction.");

    // Await the async function call and return its result
    handle_page_action(org_action_result).await
}

#[no_mangle]
extern "C" fn state() {
    let query: OrgStateAction = msg::load().expect("Unable to load the state query");
    let result = handle_org_state(query);
    msg::reply(result, 0).expect("Failed to send state reply.");
}
