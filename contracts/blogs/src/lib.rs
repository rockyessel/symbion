#![no_std]

use blogs_io::*;
use gstd::{errors::Result, msg};

#[gstd::async_main]
async fn main() {
    // Await the process_handle function and reply with the result
    let result = process_handle().await;
    msg::reply(result, 0).expect("Failed to encode or reply `process_handle`");
}

async fn process_handle() -> Result<BlogEvents, BlogEventError> {
    // Attempt to load and decode the incoming message
    let action: BlogActions = msg::load().expect("Failed to load PageAction.");

    // Await the async function call and return its result
    handle_blog_action(action).await
}

#[no_mangle]
extern "C" fn state() {
    let query: BlogStateActions = msg::load().expect("Unable to load the state query");
    let result = handle_blog_state(query);
    msg::reply(result, 0).expect("Failed to send state reply.");
}
