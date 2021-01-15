const GET_PROFILE_CLIENT = `
  {
    id,
    email,
    name,
    vat,
    street,
    city,
    category_id{
      id,
      name
    },
    country_id{
      name
    },
    state_id{
      name
    },
    phone,
    company_type,
    x_role_id{
      x_name,
      x_permission_ids{
        x_name
      }
    }
  }
`;

export default {
  GET_PROFILE_CLIENT
};
