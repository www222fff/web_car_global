import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";

interface AddressInfo {
  id: string;
  userId: string;
  address: string;
  contact: string;
}

export default function AddressPage() {
  const { user } = useAuth();
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch("/api/address", {
      headers: { "X-User-Id": user.id }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.address) setAddress(data.address);
        if (data && data.contact) setContact(data.contact);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setSaved(false);
    await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-User-Id": user.id },
      body: JSON.stringify({ address, contact })
    });
    setLoading(false);
    setSaved(true);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <div className="text-muted-foreground">Please log in to manage your address</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12 max-w-lg mx-auto">
        <h1 className="mb-6 text-3xl font-bold">Recipient Address</h1>
        <div className="space-y-4 bg-white rounded shadow p-6">
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter your address" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contact Info</label>
            <Input value={contact} onChange={e => setContact(e.target.value)} placeholder="Phone or email" />
          </div>
          <Button onClick={handleSave} disabled={loading} className="w-full mt-2">
            {loading ? "Saving..." : "Save"}
          </Button>
          {saved && <div className="text-green-600 text-sm mt-2">Saved successfully!</div>}
        </div>
      </div>
    </Layout>
  );
}
