import { expect, test } from "@playwright/test";

test("breaks the Bell State with a verified modified run and restores it", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.removeItem("qubitsphere.bell-state-progress.v1");
  });
  await page.goto("/");

  const baselineSimulationResponse = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      response.url().includes("/api/circuit/simulate")
  );
  await page.getByRole("button", { name: "Run circuit", exact: true }).click();
  expect((await baselineSimulationResponse).status()).toBe(200);

  await page.getByRole("button", { name: "Remove CNOT", exact: true }).click();
  await expect(
    page.getByText("CNOT removed. Run the modified circuit to verify the change with the simulator.")
  ).toBeVisible();

  const simulationResponse = page.waitForResponse(
    (response) =>
      response.request().method() === "POST" &&
      response.url().includes("/api/circuit/simulate")
  );
  await page.getByRole("button", { name: "Run circuit", exact: true }).click();
  expect((await simulationResponse).status()).toBe(200);

  await expect(page.getByText("Challenge complete", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Without the CNOT, the qubits are no longer being entangled by this circuit.")
  ).toBeVisible();
  await expect(page.getByText("Bell State (baseline)", { exact: true })).toBeVisible();
  await expect(page.getByText("Modified circuit (current)", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Bell State learning progress")).toContainText(
    "3 of 6 steps complete"
  );

  await page.getByRole("button", { name: "Reset Bell State", exact: true }).click();
  await expect(
    page.getByLabel(/CX control q\d+, target q\d+/)
  ).toHaveCount(2);
});
