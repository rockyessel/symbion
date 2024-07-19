#![no_std]

use gmeta::{InOut, Metadata};
use gstd::{errors::Result, msg, prelude::*, Vec};
use org_io::{CommonAddressId, Social, Status, Visibility};
use users_io::UserId;

pub struct BlogsMetadata;

pub static mut BLOGS: Vec<Blog> = Vec::new();

impl Metadata for BlogsMetadata {
    type Init = ();
    type Handle = InOut<BlogActions, Result<BlogEvents, BlogEventError>>;
    type State = InOut<BlogStateActions, BlogStateEvents>;
    type Reply = ();
    type Others = ();
    type Signal = ();
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Blog {
    pub id: CommonAddressId,
    
    pub owner: UserId,
    pub created_by: UserId,
    pub title: String,
    pub subdomain: String,
    pub custom_domain: Option<String>,
    pub category: String,
    pub created_at: String,
    pub updated_at: String,
    pub keywords: Vec<String>,
    pub description: String,
    pub visibility: Visibility,
    pub status: Status,
    pub niche: String,
    pub socials: Vec<Social>,
    pub sponsors: Vec<UserId>,
    pub favicon: Option<String>,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum BlogEventError {
    Unauthorized,
    NotFound,
    PaymentRequired,
    IncorrectAmount,
    Unknown(String),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct TransferBlogParams {
    blog_id: CommonAddressId,
    transferred_to: UserId,
    owner_id: UserId,
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum BlogActions {
    Create(CreateBlogParams),
    Transfer(TransferBlogParams),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum BlogEvents {
    Created(CommonAddressId),
    Transferred(CommonAddressId),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum BlogStateActions {
    GetAllBlogs,
    GetAllBlogsByOwner(UserId),
    GetBlogById(CommonAddressId),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum BlogStateEvents {
    GetAllBlogs(Vec<Blog>),
    GetAllBlogsByOwner(Vec<Blog>),
    GetBlogById(Option<Blog>),
}

#[derive(TypeInfo, Encode, Decode, Debug, Clone)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct CreateBlogParams {
    owner: UserId,
    created_by: UserId,
    title: String,
    created_at: String,
    updated_at: String,
    subdomain: String,
    custom_domain: Option<String>,
    category: String,
    keywords: Vec<String>,
    description: String,
    visibility: Visibility,
    status: Status,
    niche: String,
    socials: Vec<Social>,
    sponsors: Vec<UserId>,
    favicon: Option<String>,
}

pub async fn create_blog(params: CreateBlogParams) -> Result<BlogEvents, BlogEventError> {
    // Helper function to validate non-empty mandatory fields
    fn validate_mandatory_field(field: &str, field_name: &str) -> Result<(), BlogEventError> {
        if field.is_empty() {
            return Err(BlogEventError::Unknown(format!(
                "{} is required",
                field_name
            )));
        }
        Ok(())
    }

    // Helper function to validate non-empty optional fields
    // fn validate_optional_field(
    //     field: &Option<String>,
    //     field_name: &str,
    // ) -> Result<(), BlogEventError> {
    //     if let Some(ref field_value) = field {
    //         if field_value.is_empty() {
    //             return Err(BlogEventError::Unknown(format!(
    //                 "{} cannot be empty",
    //                 field_name
    //             )));
    //         }
    //     }
    //     Ok(())
    // }

    // Validate mandatory fields
    validate_mandatory_field(&params.title, "Title")?;
    validate_mandatory_field(&params.subdomain, "Slug")?;
    validate_mandatory_field(&params.description, "Description")?;
    validate_mandatory_field(&params.created_at, "Created at date")?;
    validate_mandatory_field(&params.updated_at, "Updated at date")?;

    let blog_id = msg::id();

    let blog = Blog {
        id: blog_id,
        owner: params.owner.clone(),
        created_by: params.created_by.clone(),
        title: params.title.clone(),
        subdomain: params.subdomain.clone(),
        description: params.description.clone(),
        category: params.category.clone(),
        keywords: params.keywords.clone(),
        created_at: params.created_at,
        updated_at: params.updated_at,
        custom_domain: params.custom_domain.clone(),
        visibility: params.visibility,
        status: params.status,
        niche: params.niche.clone(),
        socials: params.socials.clone(),
        sponsors: Vec::new(),
        favicon: Some(params.favicon.clone()).expect("Sth went wrong"),
    };

    // Add the page to the list
    unsafe { BLOGS.push(blog) };

    Ok(BlogEvents::Created(blog_id))
}

pub async fn transfer_blog(params: TransferBlogParams) -> Result<BlogEvents, BlogEventError> {
    unsafe {
        let blog = BLOGS.iter_mut().find(|blog| blog.id == params.blog_id);

        match blog {
            Some(blog) => {
                if blog.owner != params.owner_id {
                    return Err(BlogEventError::Unauthorized);
                }
                blog.owner = params.transferred_to;
                Ok(BlogEvents::Transferred(params.blog_id))
            }
            None => Err(BlogEventError::NotFound),
        }
    }
}

pub fn get_all_blogs() -> BlogStateEvents {
    let blogs = unsafe { BLOGS.iter().cloned().collect() };
    BlogStateEvents::GetAllBlogs(blogs)
}

pub fn get_blog_by_id(id: CommonAddressId) -> BlogStateEvents {
    let blog = unsafe { BLOGS.iter().find(|&blog| blog.id == id).cloned() };
    BlogStateEvents::GetBlogById(blog)
}

pub fn get_all_blogs_by_owner(owner: UserId) -> BlogStateEvents {
    let blogs = unsafe {
        BLOGS
            .iter()
            .filter(|&blog| blog.owner == owner)
            .cloned()
            .collect()
    };
    BlogStateEvents::GetAllBlogsByOwner(blogs)
}

pub fn handle_blog_state(state_action: BlogStateActions) -> BlogStateEvents {
    match state_action {
        BlogStateActions::GetAllBlogs => get_all_blogs(),
        BlogStateActions::GetBlogById(blog_id) => get_blog_by_id(blog_id),
        BlogStateActions::GetAllBlogsByOwner(owner) => get_all_blogs_by_owner(owner),
    }
}

pub async fn handle_blog_action(blog_action: BlogActions) -> Result<BlogEvents, BlogEventError> {
    match blog_action {
        BlogActions::Create(params) => create_blog(params).await,
        BlogActions::Transfer(params) => transfer_blog(params).await,
    }
}
