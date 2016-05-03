SELECT "conversations".*
FROM "conversations"
LEFT OUTER JOIN (
  SELECT *
  FROM "conversation_users"
  WHERE "user_id" = ?
) AS CU
ON CU."conversation_id" = "conversations"."id"
WHERE "conversations"."private" = false
AND CU."id" IS NULL
