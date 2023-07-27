export function createGmtTableListData(
  _id,
  user,
  bucketStatus,
  bucketUrl,
  ftpUrl,
  createdAt,
  customer,
  remark,
  bucketFailedReson,
  ftpDestinationPath
) {
  return {
    _id,
    user,
    bucketStatus,
    bucketUrl,
    ftpUrl,
    createdAt,
    customer,
    remark,
    bucketFailedReson,
    ftpDestinationPath
  };
}

export function createCustomerTableListData(
  _id,
  name,
  companyId,
  contactName,
  contactNumber,
  phone,
  email,
) {
  return {
    _id,
    name,
    companyId,
    contactName,
    contactNumber,
    phone,
    email,
  };
}
