export const index = async (req, res) => {
  const result = await req.db.findAsync({});
  res.end(JSON.stringify(result));
}

export const show = async (req, res) => {
  const _id = req.query().get("id");
  const result = await req.db.findOneAsync({ _id });
  res.end(JSON.stringify(result));
}

export const create = async (req, res) => {
  req.db.insertAsync(await req.body());
  res.end();
}

export const update = async (req, res) => {
  const _id = req.query().get("id");
  await req.db.updateAsync({ _id }, await req.body());
  res.end();
}

export const remove = async (req, res) => {
  const _id = req.query().get("id");
  await req.db.removeAsync({ _id });
  res.end();
}
